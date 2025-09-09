import { el } from "redom";
import "./webSoccet.css";

const field = document.getElementById("fieldWebSocket");
const container = el("div.commonWrap");

const controls = el("div.radioWrap", [
  el("label", [
    el("input.interfaceInput", {
      type: "radio",
      name: "wsToggle",
      value: "on",
      "aria-label": "Включить WebSocket",
    }),
    " Вкл",
  ]),
  el("label", [
    el("input.interfaceInput", {
      type: "radio",
      name: "wsToggle",
      value: "off",
      "aria-label": "Выключить WebSocket",
      checked: true,
    }),
    " Выкл",
  ]),
]);

let paused = false;
const pauseBtn = el(
  "button.pauseBtn",
  {
    type: "button",
    "aria-label": "Приостановить получение сообщений WebSocket",
  },
  "Пауза"
);

pauseBtn.addEventListener("click", () => {
  if (ws) {
    paused = !paused;

    appendMessage(paused ? "Пауза включена" : "Пауза снята");

    pauseBtn.setAttribute(
      "aria-label",
      paused
        ? "Возобновить получение сообщений WebSocket"
        : "Приостановить получение сообщений WebSocket"
    );

    if (pauseBtn.textContent === "Пауза") {
      pauseBtn.style.color = "darkred";
    } else {
      pauseBtn.style.color = "black";
    }
  } else {
    appendMessage("Хватит тыкать! Сначала сокет включи!");
  }

  pauseBtn.textContent = paused ? "Возобновить" : "Пауза";
});

const output = el("pre.output");
const statusDiv = el("div.statusWS", "Статус: Отключен");

container.append(controls, pauseBtn, output, statusDiv);
field.append(container);

let ws = null;

function updateStatus(text, color = "red") {
  statusDiv.textContent = `Статус: ${text}`;
  statusDiv.style.color = color;
}

function disconnectWS() {
  if (ws) {
    ws.close();
    ws = null;
  }
  updateStatus("Отключен", "red");
  clearMessages();
  paused = false;
  pauseBtn.textContent = "Пауза";
  pauseBtn.disabled = true;
  pauseBtn.setAttribute(
    "aria-label",
    "Приостановить получение сообщений WebSocket"
  );
}

function appendMessage(msg) {
  const msgTag = el("p.msg", msg);
  output.append(msgTag);
  scrollToBottom();
}

function clearMessages() {
  output.textContent = "";
}

function scrollToBottom() {
  if (output.children.length > 4) {
    output.removeChild(output.firstChild);
  }
  output.scrollTop = output.scrollHeight;
}

controls.querySelectorAll("input[name='wsToggle']").forEach((input) => {
  input.addEventListener("change", (e) => {
    if (e.target.value === "on") {
      connectWS();
    } else {
      disconnectWS();
    }
  });
});

async function connectWS() {
  if (ws) {
    ws.close();
    ws = null;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  updateStatus("Подключение...", "orange");
  const url = "wss://stream.binance.com:9443/ws/btcusdt@trade";
  ws = new WebSocket(url);

  ws.onopen = () => {
    updateStatus("Включен", "green");
    appendMessage("WebSocket подключен");
    pauseBtn.disabled = false;
  };

  ws.onmessage = (event) => {
    if (paused) return;
    try {
      const data = JSON.parse(event.data);
      const date = new Date(data.T);
      const timeStr = date.toLocaleTimeString();
      const dateStr = date.toLocaleDateString();
      const isBuyer = data.m ? "Продажа" : "Покупка";
      const volumeStatus = parseFloat(data.q) > 0.1 ? "Крупная" : "Мелкая";
      const msg = el("p.msg", [
        `ID: ${data.t} | `,
        `Цена: ${data.p} | `,
        `Объём: ${data.q} | `,
        `Дата: ${dateStr} ${timeStr} | `,
        `Тип: ${isBuyer} | `,
        `Статус: ${volumeStatus}`,
      ]);
      appendMessage(msg);
    } catch (e) {
      appendMessage("Ошибка парсинга сообщения");
      console.error(e);
    }
  };

  ws.onerror = () => {
    updateStatus("Ошибка", "red");
    appendMessage("Ошибка WebSocket");
  };

  ws.onclose = () => {
    if (!ws) {
      appendMessage("WebSocket отключен");
    }
  };
}
