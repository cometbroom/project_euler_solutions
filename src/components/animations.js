import gsap from "gsap";
import { UI_QUERY } from "../constants";
import router from "../lib/router";

const tasks = [];
let finished = true;
const duration = 0.4;

export const addSwipeAnimation = function (target, currentPage) {
  //See if next page called or previous and add to tasks
  switch (target) {
    case "next":
      tasks.push(animate(true, currentPage));
      break;
    case "prev":
      tasks.push(animate(null, currentPage));
      break;
    default:
      break;
  }
  //If tasks are finished then start the runner other wise just add to runner
  //tasks
  if (finished) {
    taskRun();
  }
};

function taskRun() {
  finished = false;
  //Recursively call tasks until there are none left.
  tasks[0]().then(() => {
    tasks.shift();
    //Condition to make animations faster
    if (tasks.length >= 2) tasks.shift();
    if (tasks.length > 0) taskRun();
    else {
      finished = true;
    }
  });
}

export function animate(next, currentPage) {
  const [left1, left2] = next ? ["-100%", "100%"] : ["100%", "-100%"];
  return () => {
    return new Promise((resolve) => {
      gsap.fromTo(
        UI_QUERY,
        { left: "0%", opacity: 1 },
        { left: left1, opacity: 0, duration, ease: "power2.in" }
      );
      //Sleep for animation go duration then navigate to next page and do animation come
      setTimeout(() => {
        router.navigateTo("algorithm", currentPage);
        gsap.fromTo(
          UI_QUERY,
          { left: left2, opacity: 0 },
          { left: "0%", opacity: 1, duration, ease: "elastic.out(0.3, 0.3)" }
        );
        setTimeout(() => {
          resolve();
        }, duration * 1000);
      }, duration * 1000);
    });
  };
}
