import _ from 'lodash';
import * as actions from './actions';
import SortWorker from 'worker-loader!./SortWorker.js';
import asyncSort from './asyncSort';

let runningWorker = null;

const spawnWorker = _.debounce((payload, dispatch) => {
  const tableName = payload.tableName;
  if (window.Worker) {
    if (runningWorker) {
      runningWorker.terminate();
      console.log('canceled previous worker');
    }
    runningWorker = new SortWorker();
    runningWorker.addEventListener('message', ({ data: { sortedData } }) => {
      dispatch(actions.dataSorted({ tableName, sortedData }));
    });
    runningWorker.postMessage(payload);
  } else {
    asyncSort(payload)
    .then((sortedData) => {
      dispatch(actions.dataSorted({ tableName, sortedData }));
    });
  }
}, 1000, { leading: true, trailing: true });

export default ({ getState, dispatch }) => next => action => {
  if (action.type === actions.TYPES.SORT_DATA) {
    spawnWorker(action.payload, dispatch);
  }

  return next(action);
}