import { el } from "redom";

function xorCipher(str, key) {
  let res = "";
  for (let i = 0; i < str.length; i++) {
    res += String.fromCharCode(
      str.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  return res;
}

const encryptedTexts = {
  alertMessage1: xorCipher(
    "Помогите люди добрые... Контент пиздят средь бела дня!<br>ААААААААААААААААА<br>Кошмар где обязательные длоки?<br>ПАМАГИИИИТТЕЕЕЕЕ!!!!",
    "key1"
  ),
  alertMessage2: xorCipher(
    "Этот сайт сделал ШИПИЛОВ МАКСИМ АНАТОЛЬЕВИЧ<br>для<br>ШИПИЛОВА МАКСИМА АНАТОЛЬЕВИЧА<br>Я НЕ <br>",
    "key2"
  ),
};

const alertContent = el("div.overflowAlertContent");
const alertForm = el("div.alertForm");
alertContent.append(alertForm);

Object.assign(alertContent.style, {
  position: "fixed",
  top: "0",
  left: "0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
});

Object.assign(alertForm.style, {
  position: "relative",
  padding: "26px 14px 60px 14px",
  display: "flex",
  justifyContent: "center",
  width: "50vw",
  minHeight: "50vh",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "18px",
  color: "#2d1a00",
  background: "linear-gradient(135deg, #ffecb3 60%, #ff9800 100%)",
  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
  boxShadow: "0 6px 24px rgba(0,0,0,0.18)",
  overflow: "hidden",
});

function addAlert(encryptedText, key) {
  const text = xorCipher(encryptedText, key);
  alertForm.innerHTML = text;

  document.body.innerHTML = "";
  document.body.append(alertContent);

  let hue = 0;
  setInterval(() => {
    hue = (hue + 37) % 360;
    alertContent.style.backgroundColor = `hsl(${hue}, 90%, 70%)`;
  }, 1000);
}

function checkElements() {
  const ids = ["myH1", "WhoAmI", "WhoAmIDescr", "IamAgain", "IloveReact"];
  const elems = ids.map((id) => document.getElementById(id));
  if (elems.some((el) => !el)) {
    addAlert(encryptedTexts.alertMessage1, "key1");
    return true;
  }
  return false;
}

function verifyContent() {
  const MYH1 = document.getElementById("myH1");
  const WHOAMI = document.getElementById("WhoAmI");
  const WHOAMIDESCR = document.getElementById("WhoAmIDescr");
  const IAMAGAIN = document.getElementById("IamAgain");

  const standards = {
    MYH1: xorCipher("Мой сайт — визитка!", "key3"),
    WHOAMI: xorCipher("Я — Шипилов Максим Анатольевич.", "key4"),
    WHOAMIDESCR: xorCipher(
      `Молодой (душой) начинающий программист, который решил освоить
            профессию, позволяющую работать удалённо и давно привлекавшую меня.`,
      "key6"
    ),
    IAMAGAIN: xorCipher("Как я и сказал, зовут меня Шипилов Максим.", "key5"),
  };

  const stdMYH1 = xorCipher(standards.MYH1, "key3");
  const stdWHOAMI = xorCipher(standards.WHOAMI, "key4");
  const stdWHOAMIDESCR = xorCipher(standards.WHOAMIDESCR, "key6");
  const stdIAMAGAIN = xorCipher(standards.IAMAGAIN, "key5");

  if (
    MYH1.textContent.trim() !== stdMYH1 ||
    WHOAMI.textContent.trim() !== stdWHOAMI ||
    WHOAMIDESCR.textContent.trim() !== stdWHOAMIDESCR ||
    IAMAGAIN.textContent.trim() !== stdIAMAGAIN
  ) {
    const aliens = xorCipher(WHOAMI.textContent.trim(), "key2");
    addAlert(encryptedTexts.alertMessage2 + aliens, "key2");
    return true;
  }
  return false;
}

document.addEventListener("DOMContentLoaded", () => {
  if (!checkElements()) {
    verifyContent();
  }
});
