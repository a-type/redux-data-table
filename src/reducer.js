const defaultState = {
  sortKey: 'id',
  sortOrder: 1,
  filterText: '',
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case 'CHANGE_SORT':
      return {
        ...state,
        sortKey: action.payload.sortKey,
        sortOrder: action.payload.sortOrder,
      };
    case 'CHANGE_FILTER_TEXT':
      return {
        ...state,
        filterText: action.payload.filterText,
      };
    default:
      return state;
  }
}