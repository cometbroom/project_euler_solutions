import gsap from "gsap";

export const numberStaggerAnimation = (targetElement) => {
  gsap.from(targetElement, {
    textContent: 0,
    duration: 0.4,
    ease: "power1.in",
    snap: { textContent: 1 },
    stagger: {
      each: 1.0,
      onUpdate: function () {
        this.targets()[0].innerHTML = `Calculated in: ${
          this.targets()[0].textContent
        } ms`;
      },
    },
  });
};
