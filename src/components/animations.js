import gsap from "../../snowpack/pkg/gsap.js";
import { UI_QUERY } from "../constants.js";
import router from "../lib/router.js";
import state$ from "../state.js";

const tasks = [];
let finished = true;
const duration = 0.4;
const NEXT = 1;
const PREV = -1;

export const addSwipeAnimation = function (target, currentPage) {
  //If next page is called pass true boolean to animation that deals with that.
  let direction = PREV;
  if (target === "next") direction = NEXT;

  //Push animation function to tasks to get called and popped
  // tasks.push(animate(next, getActualCurrentPage(target, currentPage)));
  tasks.push({
    direction,
    pureCurrentPage: getActualCurrentPage(currentPage),
  });

  //If tasks are finished then start the runner other wise just add to runner
  if (finished) {
    taskRun();
  }
};

//Find actual current page because the one from state gets updated halfway through animation.
function getActualCurrentPage(currentPage) {
  //min and max of our pages
  const [min, max] = [0, state$.getState().problems.length];
  let trueCurrentPage;

  let sumDir = 0;
  tasks.forEach((task) => (sumDir += task.direction));
  trueCurrentPage = currentPage + sumDir;

  if (trueCurrentPage >= max - 1) return max - 1;
  if (trueCurrentPage < min) return min;
  return trueCurrentPage;
}

function taskRun() {
  finished = false;
  //Recursively call tasks until there are none left.
  animate(tasks[0].direction, tasks[0].pureCurrentPage).then(() => {
    tasks.shift();
    //Condition to make animations faster
    if (tasks.length >= 2) tasks.shift();
    if (tasks.length > 0) taskRun();
    else {
      finished = true;
    }
  });
}

export function animate(direction, currentPage) {
  const [left1, left2] =
    direction === NEXT ? ["-100%", "100%"] : ["100%", "-100%"];
  return new Promise((resolve) => {
    gsap.fromTo(
      UI_QUERY,
      { left: "0%", opacity: 1 },
      { left: left1, opacity: 0, duration, ease: "power2.in" }
    );
    //Sleep for animation go duration then navigate to next page and do animation come
    setTimeout(() => {
      router.navigateTo("problems", currentPage);
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
}
