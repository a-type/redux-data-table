export const TYPES = {
  INIT: '@@redux-table_INIT',
  CHANGE_SORT: '@@redux-table_CHANGE_SORT',
  CHANGE_FILTER_TEXT: '@@redux-table_CHANGE_FILTER_TEXT',
  SORT_DATA: '@@redux-table_SORT_DATA',
  DATA_SORTED: '@@redux-table_DATA_SORTED',
  CHANGE_PAGE: '@@redux-table_CHANGE_PAGE',
};

export const init = ({ tableName }) => ({
  type: TYPES.INIT,
  payload: {
    tableName,
  },
});

export const changeSort = ({ tableName, sortKey, sortOrder }) => ({
  type: TYPES.CHANGE_SORT,
  payload: {
    tableName,
    sortKey,
    sortOrder,
  },
});

export const changeFilterText = ({ tableName, filterText }) => ({
  type: TYPES.CHANGE_FILTER_TEXT,
  payload: {
    tableName,
    filterText,
  },
});

export const sortData = ({ tableName, data, sortKey, sortOrder, filterText }) => ({
  type: TYPES.SORT_DATA,
  payload: {
    tableName,
    data,
    sortKey,
    sortOrder,
    filterText,
  },
});

export const dataSorted = ({ tableName, sortedData }) => ({
  type: TYPES.DATA_SORTED,
  payload: {
    tableName,
    sortedData,
  },
});

export const changePage = ({ tableName, pageNumber, pageSize }) => ({
  type: TYPES.CHANGE_PAGE,
  payload: {
    tableName,
    pageNumber,
  },
});