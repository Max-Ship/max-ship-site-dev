import "./sortableList.css";
import { el } from "redom";

const fieldSortableList = document.getElementById("fieldSortableList");

const test = el("div#test.testField");
const testUI = el("div#testUI.testUI");
const testResult = el("div#testResult.testResult");

const wrapCustomTimer = el("div.wrapCustomTimer");

const customTimer = createTimerSVG();
const startTestBtn = el(
  "button.startTest",
  { type: "button", "aria-label": "Начать тест на сбор шариков за 15 секунд" },
  "Пройти тест"
);

wrapCustomTimer.append(customTimer.svg);
testUI.append(startTestBtn, wrapCustomTimer);
fieldSortableList.append(test, testUI, testResult);

const textLose = el(
  "p",
  "Оооо ты не успел за 15 секунд собрать 5 шариков в корзину 🤪 Опасный ты человек однако!!!"
);
const textV1 = el(
  "p",
  "Браво за 15 секунд собрать 5 шариков в корзину, а ты смекалистый!!! Попробуй ЕЩЁ!!!"
);
const textV2 = el(
  "p",
  "Высший пилотаж! Два раза пройти этот сложный тест на смекалку. Не каждый сможет!!!"
);
const textV3 = el(
  "p",
  "ААААААААААААА!!! СУПЕР ПУПЕР МЕГА ЧАД!!! Не останавливайся, жги, давай ещё!!!"
);
const textV4 = el("img.imgGif", { src: "/gif/gif1.gif" });
const textV5 = el("p", "Дальше только - ЧИТАЙ ДАЛЬШЕ СТРАНИЦУ!!!!!!");

let winCount = 0;
let timerInterval = null;

const basket = el(
  "div.basket",
  {
    style: {
      position: "absolute",
      bottom: "20px",
      right: "20px",
      width: "60px",
      height: "60px",
      backgroundColor: "#ddd",
      borderRadius: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      userSelect: "none",
      fontSize: "24px",
    },
  },
  "🗑️"
);

let balls = [];
const colors = ["#ff5555", "#55ff55", "#5555ff", "#ffff55", "#ff55ff"];

function addBalls(count) {
  balls.forEach((ball) => ball.remove());
  balls = [];

  const fieldRect = test.getBoundingClientRect();
  const ballSize = 40;
  const maxX = fieldRect.width - ballSize;
  const maxY = fieldRect.height - ballSize;

  for (let i = 0; i < count; i++) {
    const ball = el("div.ball", {
      style: {
        position: "absolute",
        width: `${ballSize}px`,
        height: `${ballSize}px`,
        borderRadius: "50%",
        backgroundColor: colors[i % colors.length],
        top: `${Math.floor(Math.random() * maxY)}px`,
        left: `${Math.floor(Math.random() * maxX)}px`,
        cursor: "grab",
        userSelect: "none",
      },
    });
    balls.push(ball);
    test.append(ball, basket);

    const ballRect = ball.getBoundingClientRect();

    function isBallInBasket(ballRect) {
      const basketRect = basket.getBoundingClientRect();

      const isInBasket =
        ballRect.right > basketRect.left &&
        ballRect.left < basketRect.right &&
        ballRect.bottom > basketRect.top &&
        ballRect.top < basketRect.bottom;

      if (isInBasket) {
        ball.remove();
        balls = balls.filter((b) => b !== ball);
      }
    }

    isBallInBasket(ballRect);

    let isDragging = false;
    let offsetX, offsetY;

    function onMouseDown(e) {
      isDragging = true;
      offsetX = e.clientX - ball.getBoundingClientRect().left;
      offsetY = e.clientY - ball.getBoundingClientRect().top;
      ball.style.cursor = "grabbing";
      ball.style.zIndex = "10";
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }

    function onMouseMove(e) {
      if (!isDragging) return;
      const fieldRect = test.getBoundingClientRect();
      let newX = e.clientX - offsetX - fieldRect.left;
      let newY = e.clientY - offsetY - fieldRect.top;
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));
      ball.style.left = `${newX}px`;
      ball.style.top = `${newY}px`;
    }

    function onMouseUp() {
      isDragging = false;
      ball.style.cursor = "grab";
      ball.style.zIndex = "1";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      checkDrop();
    }

    function onTouchStart(e) {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      isDragging = true;
      offsetX = touch.clientX - ball.getBoundingClientRect().left;
      offsetY = touch.clientY - ball.getBoundingClientRect().top;
      ball.style.cursor = "grabbing";
      ball.style.zIndex = "10";
      document.addEventListener("touchmove", onTouchMove, { passive: false });
      document.addEventListener("touchend", onTouchEnd);
    }

    function onTouchMove(e) {
      if (!isDragging) return;
      e.preventDefault();
      const touch = e.touches[0];
      const fieldRect = test.getBoundingClientRect();
      let newX = touch.clientX - offsetX - fieldRect.left;
      let newY = touch.clientY - offsetY - fieldRect.top;
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));
      ball.style.left = `${newX}px`;
      ball.style.top = `${newY}px`;
    }

    function onTouchEnd() {
      isDragging = false;
      ball.style.cursor = "grab";
      ball.style.zIndex = "1";
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      checkDrop();
    }

    function checkDrop() {
      const ballRect = ball.getBoundingClientRect();

      isBallInBasket(ballRect);

      if (balls.length === 0) {
        winCount++;

        let textToAppend;
        switch (winCount) {
          case 1:
            textToAppend = textV1;
            break;
          case 2:
            textToAppend = textV2;
            break;
          case 3:
            textToAppend = textV3;
            break;
          case 4:
            textToAppend = textV4;
            break;
            5;
          default:
            textToAppend = textV5;
            break;
        }

        testResult.innerHTML = "";
        testResult.append(textToAppend);
        startTestBtn.disabled = false;
        wrapTimerClose();
      }
    }

    ball.addEventListener("mousedown", onMouseDown);
    ball.addEventListener("touchstart", onTouchStart, { passive: false });
  }
}

function createTimerSVG() {
  const totalTime = 15;
  let timeLeft = totalTime;
  let scale = 1.5;
  if (window.innerWidth < 1024) scale = 1;
  const radiusInner = 30 * scale;
  const radiusOuter = 40 * scale;
  const center = 50 * scale;
  const colorOuter = "#3498db";
  const colorYellow = "#FFD700";
  const colorGreen = "#90ee90";
  const colorRed = "#ff6f61";

  const svgSize = Math.round(100 * scale);
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", svgSize);
  svg.setAttribute("height", svgSize);
  svg.setAttribute("viewBox", `0 0 ${svgSize} ${svgSize}`);
  svg.setAttribute("overflow", "visible");

  const bgCircle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  bgCircle.setAttribute("cx", center);
  bgCircle.setAttribute("cy", center);
  bgCircle.setAttribute("r", radiusOuter);
  bgCircle.setAttribute("fill", "none");
  bgCircle.setAttribute("stroke", "#e6e6e6");
  bgCircle.setAttribute("stroke-width", 4 * scale);
  svg.appendChild(bgCircle);

  const outerProgress = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  outerProgress.setAttribute("cx", center);
  outerProgress.setAttribute("cy", center);
  outerProgress.setAttribute("r", radiusOuter);
  outerProgress.setAttribute("fill", "none");
  outerProgress.setAttribute("stroke", colorOuter);
  outerProgress.setAttribute("stroke-width", 4 * scale);
  const circumference = 2 * Math.PI * radiusOuter;
  outerProgress.setAttribute("stroke-dasharray", circumference);
  outerProgress.setAttribute("stroke-dashoffset", circumference);
  outerProgress.setAttribute("transform", `rotate(-90 ${center} ${center})`);
  svg.appendChild(outerProgress);

  const innerCircle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  innerCircle.setAttribute("cx", center);
  innerCircle.setAttribute("cy", center);
  innerCircle.setAttribute("r", radiusInner);
  innerCircle.setAttribute("fill", colorGreen);
  svg.appendChild(innerCircle);

  const mask = document.createElementNS("http://www.w3.org/2000/svg", "mask");
  mask.setAttribute("id", "ball-mask");
  const maskBlack = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );
  maskBlack.setAttribute("width", radiusInner * 2);
  maskBlack.setAttribute("height", radiusInner * 2);
  maskBlack.setAttribute("x", center - radiusInner);
  maskBlack.setAttribute("y", center - radiusInner);
  maskBlack.setAttribute("fill", "black");
  mask.appendChild(maskBlack);
  const maskWhite = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );
  maskWhite.setAttribute("width", radiusInner * 2);
  maskWhite.setAttribute("height", 0);
  maskWhite.setAttribute("x", center - radiusInner);
  maskWhite.setAttribute("y", center + radiusInner);
  maskWhite.setAttribute("fill", colorGreen);
  mask.appendChild(maskWhite);
  svg.appendChild(mask);

  innerCircle.setAttribute("mask", "url(#ball-mask)");

  const ray = document.createElementNS("http://www.w3.org/2000/svg", "line");
  ray.setAttribute("x1", center);
  ray.setAttribute("y1", center);
  ray.setAttribute("x2", center);
  ray.setAttribute("y2", center - radiusOuter);
  ray.setAttribute("stroke", "rgba(0,0,0,0.5)");
  ray.setAttribute("stroke-width", 1 * scale);
  ray.setAttribute("stroke-linecap", "round");
  svg.appendChild(ray);

  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", center);
  text.setAttribute("y", center + 5 * scale);
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("font-size", 20 * scale);
  text.setAttribute("font-weight", "bold");
  text.textContent = timeLeft;
  svg.appendChild(text);

  function resetTimerView() {
    text.textContent = totalTime;

    ray.setAttribute("x2", center);
    ray.setAttribute("y2", center - radiusOuter);

    outerProgress.setAttribute("stroke-dashoffset", circumference);

    maskWhite.setAttribute("height", 0);
    maskWhite.setAttribute("y", center + radiusInner);

    innerCircle.setAttribute("fill", colorGreen);
    maskWhite.setAttribute("fill", colorGreen);
  }

  const startTimer = function () {
    timeLeft = totalTime;
    text.textContent = timeLeft;

    if (timerInterval) clearInterval(timerInterval);

    resetTimerView();

    timerInterval = setInterval(() => {
      timeLeft--;
      text.textContent = timeLeft;

      const angle =
        (((360 * (totalTime - timeLeft)) / totalTime - 90) * Math.PI) / 180;
      const x2 = center + radiusOuter * Math.cos(angle);
      const y2 = center + radiusOuter * Math.sin(angle);
      ray.setAttribute("x2", x2);
      ray.setAttribute("y2", y2);

      const offsetOuter =
        circumference - (circumference * (totalTime - timeLeft)) / totalTime;
      outerProgress.setAttribute("stroke-dashoffset", offsetOuter);

      const clipHeight = (radiusInner * 2 * (totalTime - timeLeft)) / totalTime;
      maskWhite.setAttribute("height", clipHeight);
      maskWhite.setAttribute("y", center + radiusInner - clipHeight);

      if (timeLeft > 10) {
        innerCircle.setAttribute("fill", colorGreen);
        maskWhite.setAttribute("fill", colorGreen);
      } else if (timeLeft > 5) {
        innerCircle.setAttribute("fill", colorYellow);
        maskWhite.setAttribute("fill", colorYellow);
      } else {
        innerCircle.setAttribute("fill", colorRed);
        maskWhite.setAttribute("fill", colorRed);
      }

      if (timeLeft <= 0) {
        wrapTimerClose();

        test.innerHTML = "";
        testResult.innerHTML = "";
        testResult.append(textLose);

        winCount = 0;
        startTestBtn.disabled = false;
      }
    }, 1000);
  };

  return {
    svg: svg,
    startTimer: startTimer,
  };
}

function wrapTimerClose() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  wrapCustomTimer.classList.add("closeTimer");

  wrapCustomTimer.addEventListener("animationend", function (e) {
    if (e.animationName === "downTimer") {
      wrapCustomTimer.classList.remove("closeTimer", "startTimer");
    }
  });
}

startTestBtn.addEventListener("click", () => {
  startTestBtn.disabled = true;
  customTimer.startTimer();
  wrapCustomTimer.classList.add("startTimer");
  addBalls(5);
  testResult.innerHTML = "";
});

addBalls(0);
startTestBtn.disabled = false;
