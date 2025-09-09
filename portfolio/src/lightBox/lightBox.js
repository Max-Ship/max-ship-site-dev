import "./lightBox.css";
import { el } from "redom";

const field = document.getElementById("fieldCustomGallary");
const blockImages = el("div.blockImages", {
  role: "list",
  "aria-label": "Галерея изображений",
});

const INDEX_OF_POSITION = 10;
const FOCUS_INDEX_PICTURE_STANDARD = 4;
const FOCUS_INDEX_PICTURE_NATURE = 6;
const MAX_INDEX_PICTURE_STANDARD = 8;
const MAX_INDEX_PICTURE_NATURE = 12;
const CATS_FOCUS_INDEX = 9;
const THEMES = ["cats", "codings", "dogs", "flowers", "natures"];
const COMMON_SRC = "/img/";

function getIndex(theme, focus = false) {
  let index;
  if (focus) {
    index =
      theme === "natures"
        ? FOCUS_INDEX_PICTURE_NATURE
        : FOCUS_INDEX_PICTURE_STANDARD;
  } else {
    if (theme === "cats") return (index = CATS_FOCUS_INDEX);
    index =
      theme === "natures"
        ? MAX_INDEX_PICTURE_NATURE
        : MAX_INDEX_PICTURE_STANDARD;
  }
  return index;
}

function getThemesImg(theme) {
  const idx = getIndex(theme, true);
  return el("img.imgBlock", {
    src: `${COMMON_SRC}${theme}/${theme.slice(0, -1)}${idx}.jpg`,
    alt: theme,
  });
}

const customSelect = el("div.custom-select-wrapper");
const selectBtn = el(
  "button.custom-select-btn",
  {
    type: "button",
    id: "custom-select-button",
    "aria-haspopup": "listbox",
    "aria-expanded": "false",
  },
  "Выберите тему"
);

const optionsList = el("ul.custom-select-options", {
  role: "listbox",
  tabindex: -1,
  id: "custom-options-list",
  "aria-labelledby": "custom-select-button",
});

THEMES.forEach((theme) => {
  const option = el(
    "li.custom-select-option",
    {
      role: "option",
      id: `option-${theme}`,
      tabindex: 0,
      "data-value": theme,
    },
    theme
  );
  optionsList.append(option);
});

customSelect.append(selectBtn, optionsList);
field.append(customSelect);

function updateSelectBtn(value) {
  selectBtn.textContent = value || "Выберите тему";
}

function closeOptionsWithAnimation() {
  if (customSelect.classList.contains("active")) {
    customSelect.classList.add("closing");
    customSelect.addEventListener("animationend", function onAnimationEnd(e) {
      if (e.animationName === "fadeSlideOut") {
        selectBtn.setAttribute("aria-expanded", "false");
        customSelect.classList.remove("closing");
        customSelect.classList.remove("active");
      }
    });
  } else return;
}

function toggleSelectIMG(e) {
  if (
    e.type === "click" ||
    (e.type === "keydown" && (e.key === " " || e.key === "Enter"))
  ) {
    if (e.type === "keydown") e.preventDefault();

    if (customSelect.classList.contains("active")) {
      closeOptionsWithAnimation();
    } else {
      customSelect.classList.add("active");
      selectBtn.setAttribute("aria-expanded", "true");
    }
    e.stopPropagation();
  }
}

function selectOptionIMG(e) {
  if (
    e.type === "click" ||
    (e.type === "keydown" && (e.key === " " || e.key === "Enter"))
  ) {
    if (e.type === "keydown") e.preventDefault();

    if (e.target.classList.contains("custom-select-option")) {
      const val = e.target.dataset.value;
      updateSelectBtn(val);
      optionsList.setAttribute("aria-activedescendant", e.target.id);
      const target = field.querySelector(`.overflowImg[data-theme="${val}"]`);
      if (target) target.focus();
      closeOptionsWithAnimation();
    }
  }
}

selectBtn.addEventListener("click", toggleSelectIMG);
selectBtn.addEventListener("keydown", toggleSelectIMG);

optionsList.addEventListener("click", selectOptionIMG);
optionsList.addEventListener("keydown", selectOptionIMG);

document.addEventListener("click", (e) => {
  if (!customSelect.contains(e.target)) {
    if (customSelect.classList.contains("active")) {
      closeOptionsWithAnimation();
    }
  }
});

let currentFocusedOverflow = null;
let wasFocusedBeforeClick = false;

THEMES.forEach((theme, i) => {
  const overflowImg = el(`div.overflowImg.over${i}`, {
    tabIndex: 0,
    "data-theme": theme,
    role: "listitem",
  });
  overflowImg.style.transform = `translateX(${
    -INDEX_OF_POSITION * i - i
  }px) translateY(${INDEX_OF_POSITION * i + i}px) translateZ(${
    INDEX_OF_POSITION * i
  }px)`;
  overflowImg._styleTransform = overflowImg.style.transform;
  overflowImg.style.zIndex = `${1 + i}`;
  overflowImg.style.transition = "all 0.4s ease";

  const wrap = el(`.wrapImg.wrap${i}`);
  wrap.style.transition = "all 0.4s ease";

  const image = getThemesImg(theme);
  image.dataset.originalSrc = image.src;

  const strip = el("div.thumbnails-strip");
  const maxIndex = getIndex(theme);

  for (let i = 1; i < maxIndex; i++) {
    const thumb = el("img.thumbnail", {
      src: `${COMMON_SRC}${theme}/${theme.slice(0, -1)}${i}.webp`,
      alt: `${theme} thumbnail ${i}`,
      tabindex: 0,
      "data-index": i,
      "data-theme": theme,
    });

    thumb.addEventListener("click", (e) => {
      e.stopPropagation();

      closeBtn.disabled = true;
      const newSrc = thumb.src.replace(/\.webp$/, ".jpg");
      const wrap = image.parentNode;

      if (wrap.dataset.loading === "true") {
        return;
      }

      wrap.dataset.loading = "true";

      const oldLoader = wrap.querySelector("#loaderMainImg");
      if (oldLoader) oldLoader.remove();
      const loader = el("span#loaderMainImg.loaderMainImg");
      wrap.appendChild(loader);

      loader.style.display = "";

      image.style.visibility = "hidden";

      image.src = newSrc;

      image.onload = () => {
        setTimeout(() => {
          image.style.visibility = "";
          loader.remove();
          restartWrapAnimation(wrap);
          wrap.dataset.loading = "false";
          closeBtn.disabled = false;
        }, 1200);
      };

      scrollThumbnailIntoView(strip, thumb);
    });

    strip.append(thumb);
  }

  const closeBtn = el("button.lightbox-close", "×", {
    "aria-label": "Закрыть",
  });
  closeBtn.addEventListener("click", () => {
    closeLightbox(overflowImg);
  });

  wrap.append(image);
  overflowImg.append(wrap, strip, closeBtn);
  blockImages.append(overflowImg);

  if (!overflowImg.classList.contains("openLB")) {
    overflowImg.addEventListener("mousedown", () => {
      wasFocusedBeforeClick = document.activeElement === overflowImg;
    });

    overflowImg.addEventListener("click", () => {
      if (currentFocusedOverflow === overflowImg && wasFocusedBeforeClick) {
        openLightbox(currentFocusedOverflow);
      }
    });

    overflowImg.addEventListener("focus", () => {
      if (!overflowImg.classList.contains("openLB")) {
        overflowImg.style.transform = "translateZ(90px)";
        wrap.style.transform = getFocusByScreenRange();
        wrap.style.borderColor = "#4a47e8";
        overflowImg.style.zIndex = "99";
        updateSelectBtn(theme);
        currentFocusedOverflow = overflowImg;
        wasFocusedBeforeClick = false;
      } else return;
    });

    overflowImg.addEventListener("blur", () => {
      overflowImg.style.transform = overflowImg._styleTransform;
      wrap.style.transform = "";
      wrap.style.borderColor = "black";
      overflowImg.style.zIndex = `${1 + i}`;
      overflowImg.style.boxShadow = "";
      updateSelectBtn(false);
      optionsList.removeAttribute("aria-activedescendant");
      currentFocusedOverflow = null;
      wasFocusedBeforeClick = false;
    });
  }
});

field.append(blockImages);

function getFocusByScreenRange() {
  const width = window.innerWidth;
  if (width >= 1024) {
    return "translateX(-5px) translateY(22px) translateZ(90px) scale(1.09)";
  } else if (width >= 769 && width < 1024) {
    return "translateX(-5px) translateY(25px) translateZ(90px) scale(1.25)";
  } else if (width >= 577 && width < 769) {
    return "translateX(-20px) translateY(25px) translateZ(90px) scale(1.19)";
  } else {
    return "translateX(-27px) translateY(10px) translateZ(90px) scale(1.127)";
  }
}

function preventScrollKeys(e) {
  const keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
  if (keys.includes(e.keyCode)) {
    e.preventDefault();
  }
}

function scrollThumbnailIntoView(strip, thumb) {
  const stripRect = strip.getBoundingClientRect();
  const thumbRect = thumb.getBoundingClientRect();

  const scrollLeft = strip.scrollLeft;
  const offset =
    thumbRect.left - stripRect.left + thumbRect.width / 2 - stripRect.width / 2;

  strip.scrollTo({
    left: scrollLeft + offset,
    behavior: "smooth",
  });
}

function restartWrapAnimation(wrap) {
  if (!wrap) return;
  const parent = wrap.parentNode;
  if (parent && parent.classList.contains("openLB")) {
    wrap.style.animation = "none";
    void wrap.offsetWidth;
    wrap.style.animation = "addWrapIng 0.4s ease forwards";
  } else return;
}

function openLightbox(overflowImg) {
  overflowImg.blur();
  overflowImg._originalParent = overflowImg.parentNode;
  overflowImg._originalNextSibling = overflowImg.nextSibling;

  document.body.appendChild(overflowImg);
  overflowImg.style.transform = "";
  overflowImg.classList.add("openLB");

  document.body.style.overflow = "hidden";
  window.addEventListener("keydown", preventScrollKeys, { passive: false });

  const wrap = overflowImg.querySelector(".wrapImg");
  restartWrapAnimation(wrap);

  const image = overflowImg.querySelector(".wrapImg img");
  const strip = overflowImg.querySelector(".thumbnails-strip");

  if (image && strip) {
    const currentSrcJpg = image.src.replace(/\.jpg$/, ".webp");

    const currentThumb = Array.from(
      strip.querySelectorAll("img.thumbnail")
    ).find((thumb) => thumb.src === currentSrcJpg);

    if (currentThumb) {
      currentThumb.focus();

      scrollThumbnailIntoView(strip, currentThumb);
    }
  }
}

function closeLightbox(overflowImg) {
  overflowImg.classList.remove("openLB");
  overflowImg.style.animation = "";

  const wrap = overflowImg.querySelector(".wrapImg");

  if (overflowImg._originalParent) {
    overflowImg.style.transform = overflowImg._styleTransform;
    if (overflowImg._originalNextSibling) {
      overflowImg._originalParent.insertBefore(
        overflowImg,
        overflowImg._originalNextSibling
      );
    } else {
      overflowImg._originalParent.appendChild(overflowImg);
    }
  }

  document.body.style.overflow = "";
  window.removeEventListener("keydown", preventScrollKeys, { passive: false });

  restartWrapAnimation(wrap);
  wrap.style.animation = "";
}
