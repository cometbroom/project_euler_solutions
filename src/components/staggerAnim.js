import gsap from "../../snowpack/pkg/gsap.js";

export const numberStaggerAnimation = (targetElement, elapsed) => {
  const counter = { val: elapsed };

  gsap.from(counter, {
    duration: 0.4,
    ease: "power1.in",
    val: 0,
    snap: { val: 1 },
    stagger: {
      each: 1.0,
      onUpdate: function () {
        targetElement.textContent = `Calculated in: ${counter.val} ms`;
      },
    },
  });
};
