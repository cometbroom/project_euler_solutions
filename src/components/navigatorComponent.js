import state$ from "../state";
import createNavigatorView from "../views/navigatorView";
import { addSwipeAnimation } from "./animations";

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
