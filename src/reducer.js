import { TYPES } from './actions';

const defaultState = {};

const defaultTableState = {
  sortKey: 'id',
  sortOrder: 1,
  filterText: '',
  sorting: false,
  sortedData: [],
  currentPage: 0,
};

const calcNewPage = (dataSize, pageSize, newPage) => {
  const numPages = dataSize / pageSize;
  if (newPage < 0) {
    return numPages + newPage;
  }
  return newPage;
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case TYPES.INIT:
      return {
        ...state,
        [action.payload.tableName]: defaultTableState,
      };
    case TYPES.CHANGE_SORT:
      return {
        ...state,
        [action.payload.tableName]: {
          ...state[action.payload.tableName],
          sortKey: action.payload.sortKey,
          sortOrder: action.payload.sortOrder,
        }
      };
    case TYPES.CHANGE_FILTER_TEXT:
      return {
        ...state,
        [action.payload.tableName]: {
          ...state[action.payload.tableName],
          filterText: action.payload.filterText,
          currentPage: 0,
        }
      };
    case TYPES.SORT_DATA:
      return {
        ...state,
        [action.payload.tableName]: {
          ...state[action.payload.tableName],
          sorting: true,
        }
      };
    case TYPES.DATA_SORTED:
      return {
        ...state,
        [action.payload.tableName]: {
          ...state[action.payload.tableName],
          sorting: false,
          sortedData: action.payload.sortedData,
        }
      };
    case TYPES.CHANGE_PAGE:
      return {
        ...state,
        [action.payload.tableName]: {
          ...state[action.payload.tableName],
          currentPage: calcNewPage(
            state[action.payload.tableName].sortedData.length,
            action.payload.pageSize,
            action.payload.pageNumber
          ),
        }
      };
    default:
      return state;
  }
}