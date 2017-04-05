import _ from 'lodash';
import * as actions from './actions';
import sortWorker from './sortWorker';
import asyncSort from './asyncSort';

const sort = _.debounce((payload, dispatch) => {
  const tableName = payload.tableName;
  if (sortWorker) {
    sortWorker.postMessage(payload);
  } else {
    asyncSort(payload)
    .then((sortedData) => {
      dispatch(actions.dataSorted({ tableName, sortedData }));
    });
  }
}, 1000, { leading: true, trailing: true });

export default ({ getState, dispatch }) => {
  if (sortWorker) {
    sortWorker.addEventListener('message', ({ data: { sortedData } }) => {
      dispatch(actions.dataSorted({ tableName, sortedData }));
    });
  }

  return next => action => {
    if (action.type === actions.TYPES.SORT_DATA) {
      sort(action.payload, dispatch);
    }

    return next(action);
  };
}