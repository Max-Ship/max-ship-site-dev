import { el } from "redom";
import "./buttons.css";

const field = document.getElementById("fieldStateButton");

const buttonA = el(
  "button.btn.buttonA",
  {
    type: "button",
    "aria-label":
      "Кнопка A: демонстрация изменения фона, теней текста на ховере, выделения контура при фокусе и оранжевого фона при нажатии",
  },
  "button"
);

const buttonB = el(
  "button.btn.buttonB",
  {
    type: "button",
    "aria-label":
      "Кнопка B: демонстрация увеличения, изменения цвета текста и подсветки при фокусе и ховере, уменьшения при нажатии",
  },
  "ButtoN"
);

const buttonC = el(
  "button.btn.buttonC",
  {
    type: "button",
    "aria-label":
      "Кнопка C: демонстрация радиального свечения, появления эффектов свечения и ряби при наведении, подсветки при фокусе",
  },
  "BUTTON"
);

const buttonA3D = el(
  "button.btn3D.buttonA3D",
  {
    type: "button",
    "aria-label":
      "3D кнопка A: демонстрация изменения цвета и светящихся теней, 3D псевдоэлемента при наведении, фокусе и нажатии",
  },
  "button3D"
);

const buttonB3D = el(
  "button.btn3D.buttonB3D",
  {
    type: "button",
    "aria-label":
      "3D кнопка B: демонстрация 3D тени, изменения цвета и перемещения по оси Y при наведении, фокусе и нажатии",
  },
  "ButtoN3D"
);
const wrap3DC = el("div.wrap3DC");
const buttonC3D = el(
  "button.btn3D.buttonC3D",
  {
    type: "button",
    "aria-label":
      "3D кнопка C: демонстрация ripple-эффекта при клике и масштабирования обертки при наведении",
  },
  "BUTTON3D"
);
wrap3DC.append(buttonC3D);

const wrapCHZ = el("div.wrapCHZ");
const buttonCHZ = el(
  "button.btn.buttonCHZ",
  {
    type: "button",
    "aria-label":
      "Кнопка CHZ: демонстрация плавного градиентного свечения при фокусе и наведении, анимация пузырьков при клике",
  },
  "btnCHZ"
);
const wrapCHZ3D = el("div.wrapCHZ3D ");
const buttonCHZ3D = el("button.btn3D.buttonCHZ3D", {
  type: "button",
  "aria-label":
    "3D кнопка CHZ: демонстрация переворачивающегося флипа с многослойным эффектом при наведении и фокусе",
});
const spanFront = el("span.buttonCHZ3D-item.buttonCHZ3D__front", "button");
const spanCenter = el("span.buttonCHZ3D-item.buttonCHZ3D__center", {
  "aria-hidden": "true",
});
const spanBack = el("span.buttonCHZ3D-item.buttonCHZ3D__back", "isHOVER");

buttonCHZ3D.append(spanFront, spanCenter, spanBack);
wrapCHZ.append(buttonCHZ);
wrapCHZ3D.append(buttonCHZ3D);

field.append(
  buttonA,
  buttonB,
  buttonC,
  buttonA3D,
  buttonB3D,
  wrap3DC,
  wrapCHZ,
  buttonCHZ3D
);

buttonC3D.addEventListener("click", function (e) {
  const rect = this.getBoundingClientRect();
  const rippleCount = 3;
  const maxSize = Math.max(rect.width, rect.height);
  const centerX = e.clientX - rect.left - maxSize / 2;
  const centerY = e.clientY - rect.top - maxSize / 2;

  for (let i = 0; i < rippleCount; i++) {
    const ripple = el("span");
    ripple.classList.add("ripple");
    ripple.setAttribute("aria-hidden", "true");

    ripple.style.width = ripple.style.height = maxSize + "px";

    ripple.style.left = centerX + i * 5 + "px";
    ripple.style.top = centerY + i * 5 + "px";

    ripple.style.animationDelay = i * 0.6 + "s";

    this.append(ripple);

    if (wrap3DC.classList.contains("wave-active"))
      wrap3DC.classList.remove("wave-active");

    wrap3DC.classList.add("wave-active");

    ripple.addEventListener("animationend", () => {
      ripple.remove();
      if (!this.querySelector(".ripple")) {
        setTimeout(() => wrap3DC.classList.remove("wave-active"), 450);
      }
    });
  }
});

buttonCHZ.addEventListener("click", function () {
  this.parentElement.classList.remove("animate");
  this.parentElement.classList.add("animate");
  this.parentElement.addEventListener("animationend", function (e) {
    if (e.animationName === "bottomBubbles") this.classList.remove("animate");
  });
});

buttonCHZ3D.addEventListener("focus", function () {
  spanFront.textContent = "isFOCUS";
});
buttonCHZ3D.addEventListener("blur", function () {
  this.classList.add("flip-anim");
  setTimeout(() => {
    spanFront.textContent = "button";
  }, 350);
  this.addEventListener("animationend", function (e) {
    if (e.animationName === "flip") this.classList.remove("flip-anim");
  });
});
