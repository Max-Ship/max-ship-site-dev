import "./lazyLoadAndGsap.css";
import { el } from "redom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function initScrollRevealAnimations() {
  const images = document.querySelectorAll("picture.scrollReveal");

  images.forEach((wrap, i) => {
    const img = wrap.querySelector("img");

    function createAnimation(
      animationProps,
      scrollTriggerConfig,
      simple = false
    ) {
      if (simple) {
        gsap.fromTo(
          img,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            scrollTrigger: scrollTriggerConfig,
            ease: "power2.out",
          }
        );
      } else {
        const tl = gsap.timeline({ scrollTrigger: scrollTriggerConfig });
        tl.fromTo(
          img,
          {
            ...animationProps,
            filter: animationProps.filter || "blur(0px)",
            boxShadow: animationProps.boxShadow || "none",
            opacity: animationProps.opacity,
            scale: animationProps.scale || 1,
            x: animationProps.x || 0,
            y: animationProps.y || 0,
            rotation: animationProps.rotation || 0,
            ease: animationProps.ease || "power1.out",
          },
          {
            filter: "blur(0px)",
            boxShadow: "none",
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            rotation: 0,
            duration: animationProps.duration || 1.5,
            ease: animationProps.ease || "power1.out",
          }
        );
      }
    }

    let animationProps;
    switch (i) {
      case 0:
        animationProps = {
          x: -125,
          rotation: 5,
          opacity: 0,
          filter: "blur(8px)",
          boxShadow: "0 0 25px rgba(255, 100, 150, 0.6)",
          scale: 0.85,
          duration: 1.6,
          ease: "power4.out",
        };
        break;
      case 1:
        animationProps = {
          x: 125,
          rotation: -25,
          opacity: 0,
          filter: "blur(8px)",
          boxShadow: "0 0 25px rgba(255, 100, 150, 0.6)",
          scale: 0.85,
          duration: 1.6,
          ease: "power4.out",
        };
        break;
      case 2:
        animationProps = {
          x: -150,
          scale: 0.5,
          opacity: 0,
          filter: "blur(4px)",
          boxShadow: "0 0 35px rgba(100, 200, 255, 0.7)",
          duration: 1.4,
          ease: "power2.out",
        };
        break;
      case 3:
        animationProps = {
          x: 150,
          scale: 0.5,
          opacity: 0,
          filter: "blur(4px)",
          boxShadow: "0 0 35px rgba(100, 200, 255, 0.7)",
          duration: 1.4,
          ease: "power2.out",
        };
        break;
      case 4:
        animationProps = {
          x: -150,
          y: -100,
          scale: 0.1,
          opacity: 0,
          duration: 1.5,
          ease: "back.out(1.2)",
        };
        break;
      default:
        animationProps = { opacity: 0, duration: 1, ease: "power2.out" };
    }

    ScrollTrigger.matchMedia({
      "(min-width: 1024px)": function () {
        const scrollTriggerConfig = {
          trigger: wrap,
          start: "center bottom",
          end: "bottom 80%",
          toggleActions: "play none play reverse",
          scrub: 0.3,
        };
        createAnimation(animationProps, scrollTriggerConfig, false);

        ScrollTrigger.create({
          trigger: wrap,
          start: "center top",
          end: "bottom 99%",
          scrub: 0.3,
          onEnterBack: () =>
            gsap.to(img, { opacity: 1, duration: 0.5, ease: "power2.out" }),
          onLeave: () =>
            gsap.to(img, { opacity: 0, duration: 0.5, ease: "power2.out" }),
        });
      },

      "(min-width: 768px) and (max-width: 1023.98px)": function () {
        const scrollTriggerConfig = {
          trigger: wrap,
          start: "top 75%",
          end: "bottom bottom",
          toggleActions: "play none play reverse",
          scrub: 0.75,
        };
        createAnimation(animationProps, scrollTriggerConfig, false);

        ScrollTrigger.create({
          trigger: wrap,
          start: "center top",
          end: "bottom 98%",
          scrub: 0.3,
          onEnterBack: () =>
            gsap.to(img, { opacity: 1, duration: 0.5, ease: "power2.out" }),
          onLeave: () =>
            gsap.to(img, { opacity: 0, duration: 0.5, ease: "power2.out" }),
        });
      },

      "(min-width: 577px) and (max-width: 767.98px)": function () {
        const scrollTriggerConfig = {
          trigger: wrap,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        };
        createAnimation(animationProps, scrollTriggerConfig, true);
      },

      "(max-width: 576px)": function () {
        const scrollTriggerConfig = {
          trigger: wrap,
          start: "center bottom",
          end: "bottom bottom",
          scrub: 1.2,
        };
        createAnimation(null, scrollTriggerConfig, true);
      },
    });

    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => {
      const overlay = el("div.overlaySR");
      const bigImg = el("img.bigImgSR");
      bigImg.src = img.src;
      bigImg.alt = img.alt || "";

      overlay.appendChild(bigImg);
      document.body.appendChild(overlay);

      document.body.style.overflow = "hidden";

      overlay.addEventListener("click", () => {
        document.body.removeChild(overlay);

        document.body.style.overflow = "";
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", initScrollRevealAnimations);

const fieldLL = document.getElementById("fieldLazyLoad");

const minNumIndexSrcImgLL = 6;
const maxNumIndexSrcImgLL = 9;

const screamerArea = el("div.screamA");
const overflowScreamer = el("span#screaner.overflowScreamer");
const imgScreamer = el("img.imgScream", {
  src: "/img/screamer.jpg",
});
overflowScreamer.append(imgScreamer);
const beforScr = el("img.beforScr", { src: "/img/beforScr.jpg" });

for (let i = minNumIndexSrcImgLL; i < maxNumIndexSrcImgLL; i++) {
  const wrap = el("div.lazyLoad");

  if (i === 8) {
    wrap.append(screamerArea);
    wrap.id = "screamerImg";
  }

  const img = el("img", {
    "data-src": `/img/cats/cat${i}.jpg`,
    className: "lazy",
    alt: `Лысый кот номер: ${i}`,
  });

  const wrapLoader = el("span#loaderLL.wrapLoader");
  const loader = el(`span.loaderL${i}`);
  wrapLoader.append(loader);

  wrap.append(img, wrapLoader);
  fieldLL.append(wrap);
}

const lazyImages = document.querySelectorAll("img.lazy");

if ("IntersectionObserver" in window) {
  const lazyImageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.onload = () => {
            lazyImage.classList.add("loaded");
            lazyImage.classList.remove("lazy");
            const loader =
              lazyImage.parentNode.querySelector("span.wrapLoader");
            if (loader) {
              loader.remove();
            }
            lazyImage.parentNode.style.background = "none";
          };
          observer.unobserve(lazyImage);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -5px 0px",
      threshold: 1,
    }
  );

  lazyImages.forEach((img) => {
    lazyImageObserver.observe(img);
  });
}

let screamerTimer = null;
let isScreamerActive = false;
let isEffectRunning = false;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runScreamer() {
  const screamerImg = document.getElementById("screamerImg");
  screamerImg.append(beforScr);

  await new Promise(requestAnimationFrame);

  await delay(2000);

  document.body.style.overflow = "hidden";
  document.body.style.pointerEvents = "none";
  document.body.append(overflowScreamer);

  await new Promise(requestAnimationFrame);

  await delay(1300);

  if (overflowScreamer.parentNode) {
    overflowScreamer.parentNode.removeChild(overflowScreamer);
  }
  if (beforScr.parentNode) {
    beforScr.parentNode.removeChild(beforScr);
  }
  document.body.style.overflow = "";
  document.body.style.pointerEvents = "";
}

async function startScreamerEffect() {
  if (isScreamerActive || isEffectRunning) return;

  isScreamerActive = true;

  screamerTimer = setTimeout(async () => {
    isEffectRunning = true;

    await runScreamer();

    isScreamerActive = false;
    screamerTimer = null;
    isEffectRunning = false;
  }, 3700);
}

function cancelScreamerEffect() {
  if (screamerTimer) {
    clearTimeout(screamerTimer);
    screamerTimer = null;
  }

  isScreamerActive = false;
}

screamerArea.addEventListener("mouseenter", startScreamerEffect);
screamerArea.addEventListener("mouseleave", cancelScreamerEffect);

screamerArea.addEventListener("click", startScreamerEffect);
