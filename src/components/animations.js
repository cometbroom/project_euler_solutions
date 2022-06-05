import gsap from "gsap";
import { UI_QUERY } from "../constants";
import router from "../lib/router";
import state$ from "../state";

const tasks = [];
let finished = true;
const duration = 0.4;

export const addSwipeAnimation = function (target, currentPage) {
  //If next page is called pass true boolean to animation that deals with that.
  let next = false;
  if (target === "next") next = true;

  //Push animation function to tasks to get called and popped
  tasks.push(animate(next, getActualCurrentPage(target, currentPage)));

  //If tasks are finished then start the runner other wise just add to runner
  if (finished) {
    taskRun();
  }
};

//Find actual current page because the one from state gets updated halfway through animation.
function getActualCurrentPage(target, currentPage) {
  //min and max of our pages
  const [min, max] = [0, state$.getState().problems.length];
  let trueCurrentPage;

  switch (target) {
    case "next":
      //Tasks length means true currentPage is more/less than what's passed here
      trueCurrentPage = currentPage + tasks.length;

      //With many tasks, trueCurrentPage can overflow as the control is on state
      //We add an additional control to prevent that.
      if (trueCurrentPage >= max - 1) return max - 1;
      //Return twice instead of break. save 1 line.
      return trueCurrentPage;
    case "prev":
      trueCurrentPage = currentPage - tasks.length;
      if (trueCurrentPage < min) return min;
      return trueCurrentPage;
  }
  return 0;
}

function taskRun() {
  finished = false;
  //Recursively call tasks until there are none left.
  console.log(tasks);
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
  };
}
