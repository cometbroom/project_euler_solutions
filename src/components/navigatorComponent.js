import state$ from "../state.js";
import createNavigatorView from "../views/navigatorView.js";
import { addSwipeAnimation } from "./animations.js";

function createNavigatorComponent() {
  const onPrevClick = () => {
    addSwipeAnimation("prev", state$.getState().problemNum - 1);
  };
  const onNextClick = () => {
    addSwipeAnimation("next", state$.getState().problemNum + 1);
  };

  const viewProps = { onPrevClick, onNextClick };
  const view = createNavigatorView(viewProps);

  state$.subscribe(view.update);

  return view;
}

export default createNavigatorComponent;
