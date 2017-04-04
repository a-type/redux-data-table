import { combineReducers } from 'redux';
import tables from '../src/reducer';

function exampleReducer(state = { loading: false, data: [] }, action) {
  switch (action.type) {
    case 'LOAD_DATA':
      return {
        loading: true,
        data: [],
      };
    case 'GOT_DATA':
      return {
        loading: false,
        data: action.payload,
      };
    default:
      return state;
  }
}

export default combineReducers({
  app: exampleReducer,
  tables,
});