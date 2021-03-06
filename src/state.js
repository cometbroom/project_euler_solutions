import log from './lib/logger.js';
import createObservableState from './lib/observableState';

const state$ = createObservableState();
state$.subscribe((state) => {
  log.debug('state', state);
});

export default state$;
