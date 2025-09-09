import { el } from "redom";
import "./weatherApi.css";

function formatDateTime(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr;

  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const hasTime = /\d{2}:\d{2}/.test(dateStr);

  if (hasTime) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  } else {
    return `${day} ${month} ${year}`;
  }
}

async function getCoords(city) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
      city
    )}&format=json&limit=1`;
    const resp = await fetch(url, { headers: { "User-Agent": "DemoApp" } });
    const data = await resp.json();
    if (data.length === 0) return false;
    return { lat: data[0].lat, lon: data[0].lon };
  } catch (e) {
    console.log(e);
    if (!navigator.onLine) {
      return null;
    }
    return false;
  }
}

async function getWeatherByCity(city, days = 3) {
  try {
    const coords = await getCoords(city);

    if (coords === false) {
      return { City: false, DataWeather: false };
    } else if (coords === null) {
      return { City: null, DataWeather: null };
    }
    const { lat, lon } = coords;

    const forecastDays = Math.min(days, 7);

    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max` +
      `&current_weather=true&timezone=Europe/Moscow&forecast_days=${forecastDays}`;

    const resp = await fetch(url);

    if (!resp.ok) return { City: coords, DataWeather: false };

    const data = await resp.json();

    return { City: coords, DataWeather: data, Days: days };
  } catch (e) {
    return null;
  }
}

function createCurrentWeatherDiv(currentWeather, weatherCodes, city) {
  return el(
    "div.currentWeather",
    el("h4.currentWeatherTitle", `Текущая погода в ${city}:`),
    el(
      "ul.currentWeatherList",
      el("li.dataWeatherLi", `Температура: ${currentWeather.temperature}°C`),
      el(
        "li.dataWeatherLi",
        `Скорость ветра: ${currentWeather.windspeed} км/ч`
      ),
      el(
        "li.dataWeatherLi",
        `Направление ветра: ${currentWeather.winddirection}°`
      ),
      el(
        "li.dataWeatherLi",
        `Погода: ${weatherCodes[currentWeather.weathercode] || "Неизвестно"}`
      ),
      el("li.dataWeatherLi", `Время: ${formatDateTime(currentWeather.time)}`)
    )
  );
}

function createWeatherByDaysDiv(daily) {
  if (!daily || !daily.time || !Array.isArray(daily.time)) {
    return el(
      "p.noDataWeather",
      { role: "alert", "aria-live": "assertive" },
      "Данные очень странные, не пуду показвать!\nПовторите запрос!"
    );
  }

  const daysList = el("ul.weatherDaysList");

  for (let i = 0; i < daily.time.length; i++) {
    daysList.append(
      el(
        "li.weatherDayItem",
        el("h5.weatherDayDate", `Дата: ${formatDateTime(daily.time[i])}`),
        el(
          "ul.weatherDayParams",
          el(
            "li.dataWeatherLi",
            `Макс. температура: ${daily.temperature_2m_max[i]}°C`
          ),
          el(
            "li.dataWeatherLi",
            `Мин. температура: ${daily.temperature_2m_min[i]}°C`
          ),
          el("li.dataWeatherLi", `Осадки: ${daily.precipitation_sum[i]} мм`),
          el(
            "li.dataWeatherLi",
            `Макс. скорость ветра: ${daily.wind_speed_10m_max[i]} м/с`
          )
        )
      )
    );
  }

  return el(
    "div.weatherDaysBlock",
    el("h4.weatherDaysTitle", `Прогноз по дням:`),
    daysList
  );
}

function getSpiner() {
  const dataWeather = document.getElementById("dataWeather");
  const wrap = el("span.loaderWrap");
  const loader = el("span.loader");
  const innerOne = el("span.inner.one");
  const innerTwo = el("span.inner.two");
  const innerThree = el("span.inner.three");
  loader.append(innerOne, innerTwo, innerThree);
  wrap.append(loader);
  dataWeather.append(wrap);
}

function getAnimCloseSelect() {
  if (bodySelect.classList.contains("active")) {
    bodySelect.classList.add("close");
    bodySelect.addEventListener("animationend", function onAnimationEnd(e) {
      if (e.animationName === "fadeInUpOptions") {
        selected.setAttribute("aria-expanded", "false");
        bodySelect.classList.remove("close");
        bodySelect.classList.remove("active");
      }
    });
  } else return;
}

async function getRenderTag() {
  const city = inputCity.value.trim();
  const days = parseInt(selected.textContent, 10);
  const weatherCodes = {
    0: "Ясно",
    1: "Преимущественно ясно",
    2: "Частично облачно",
    3: "Пасмурно",
    45: "Туман",
    48: "Морозный туман",
    51: "Лёгкая морось",
    53: "Умеренная морось",
    55: "Сильная морось",
    56: "Лёгкий ледяной дождь",
    57: "Сильный ледяной дождь",
    61: "Небольшой дождь",
    63: "Умеренный дождь",
    65: "Сильный дождь",
    66: "Лёгкий ледяной дождь",
    67: "Сильный ледяной дождь",
    71: "Небольшой снег",
    73: "Умеренный снег",
    75: "Сильный снег",
    77: "Снежные зерна",
    80: "Ливневый дождь",
    81: "Сильный ливневый дождь",
    82: "Очень сильный ливневый дождь",
    85: "Лёгкий снегопад",
    86: "Сильный снегопад",
    95: "Гроза",
    96: "Гроза с лёгким градом",
    99: "Гроза с сильным градом",
  };

  let renderData = null;

  if (!city) {
    return (renderData = el(
      "p.noCity",
      { role: "alert", "aria-live": "assertive" },
      "А где город?"
    ));
  }

  const data = await getWeatherByCity(city, days);

  if (data === null || data.City === null) {
    renderData = el(
      "p.noInternet",
      { role: "alert", "aria-live": "assertive" },
      "Что то все поломалось!\nПроверь интернет или сделай запрос позже!"
    );
  } else if (data.City === false) {
    renderData = el(
      "p.noCity",
      { role: "alert", "aria-live": "assertive" },
      "Ну либо у nominatim.openstreetmap.org сервер заболел и не может найти этот город,\nлибо такого города НЕТ на планете Земля!\nПроверь название города!"
    );
  } else if (data.City && !data.DataWeather) {
    renderData = el(
      "p.noDataWeather",
      `Город твой ${city}!\n
                Координаты: ${data["City"].lat} и ${data["City"].lon}!\n
                А вот данных погоды нет!\nМожет сревер у open-meteo.com лег поспать?\n
                Попробуй повторить запрос или зайти чуточку позже!`
    );
  } else if (data.City && data.DataWeather && data.Days === 1) {
    renderData = createCurrentWeatherDiv(
      data.DataWeather.current_weather,
      weatherCodes,
      city
    );
  } else if (data.City && data.DataWeather && data.Days > 1) {
    const tagCurrentWeather = createCurrentWeatherDiv(
      data.DataWeather.current_weather,
      weatherCodes,
      city
    );
    const tagWeatherdays = createWeatherByDaysDiv(data.DataWeather.daily, days);
    renderData = el("div.commonBlock");
    renderData.append(tagCurrentWeather, tagWeatherdays);
  }

  return renderData;
}

function toggleSelect(e) {
  if (
    e.type === "click" ||
    (e.type === "keydown" && (e.key === " " || e.key === "Enter"))
  ) {
    if (e.type === "keydown") e.preventDefault();

    if (bodySelect.classList.contains("active")) {
      getAnimCloseSelect();
      selected.setAttribute("aria-expanded", "false");
    } else {
      bodySelect.classList.add("active");
      selected.setAttribute("aria-expanded", "true");
    }
    e.stopPropagation();
  }
}

function selectOption(e) {
  if (
    e.type === "click" ||
    (e.type === "keydown" && (e.key === " " || e.key === "Enter"))
  ) {
    if (e.type === "keydown") e.preventDefault();

    selected.textContent = e.currentTarget.textContent;
    options.setAttribute("aria-activedescendant", e.currentTarget.id);
    selected.setAttribute("aria-expanded", "false");
    getAnimCloseSelect();
    e.stopPropagation();
  }
}

const fieldAPI = document.getElementById("fieldAPI");

const wrapUI = el("div.wrapUI");

const wrapInput = el("label.wrapInput", { htmlFor: "IC" });
const inputCity = el("input#IC.inputCity", {
  placeholder: " ",
  type: "text",
});
wrapInput.append(inputCity);

const wrapSelect = el("div.wrapSelect");
const selectLabelText = el("p.selectLabeltext");
selectLabelText.textContent = "Выберите количество дней!\n1 - сейчас!";
const bodySelect = el("div.bodySelect");
const selected = el("div.selected", "1");
selected.tabIndex = 0;
selected.setAttribute("role", "button");
selected.setAttribute("aria-haspopup", "listbox");
selected.setAttribute("aria-expanded", "false");
const options = el("div.options");
options.tabIndex = -1;
options.setAttribute("role", "listbox");
const maxDays = 6;

for (let i = 0; i < maxDays; i++) {
  const option = el("div.option", `${i + 1}`);
  option.tabIndex = 0;
  option.setAttribute("role", "option");
  option.id = `option-${i + 1}`;
  options.append(option);
}
bodySelect.append(selected, options);

wrapSelect.append(selectLabelText, bodySelect);

const buttonGD = el("button.buttonGD", { type: "button" }, "ЖМИ!");

wrapUI.append(wrapInput, wrapSelect, buttonGD);

const dataWeather = el("div#dataWeather.dataWeather", {
  "aria-live": "polite",
  "aria-atomic": "true",
});

fieldAPI.append(wrapUI, dataWeather);

const optionsArr = bodySelect.querySelectorAll(".option");

optionsArr.forEach((option, i) => {
  option.style.setProperty("--i", i);
});

selected.addEventListener("click", toggleSelect);
selected.addEventListener("keydown", toggleSelect);

optionsArr.forEach((option) => {
  option.addEventListener("click", selectOption);
  option.addEventListener("keydown", selectOption);
});

document.addEventListener("click", () => {
  getAnimCloseSelect();
  selected.setAttribute("aria-expanded", "false");
});

buttonGD.addEventListener("click", async () => {
  const dataWeather = document.getElementById("dataWeather");
  dataWeather.innerHTML = "";

  getSpiner();

  const [renderTag] = await Promise.all([
    getRenderTag(),
    new Promise((resolve) => setTimeout(resolve, 900)),
  ]);

  dataWeather.innerHTML = "";
  dataWeather.append(renderTag);
});
