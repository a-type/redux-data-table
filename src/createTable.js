import { connect } from 'react-redux';
import * as actions from './actions';
import ReduxTable from './ReduxTable';

export default ({ tableName }) => {
  const mapStateToProps = (state) => state.tables[tableName] ? {
    sortKey: state.tables[tableName].sortKey,
    sortOrder: state.tables[tableName].sortOrder,
    filterText: state.tables[tableName].filterText,
    sortedData: state.tables[tableName].sortedData,
    sorting: state.tables[tableName].sorting,
    currentPage: state.tables[tableName].currentPage,
  } : {};

  const mapDispatchToProps = (dispatch) => ({
    init: () => dispatch(actions.init({ tableName })),
    changeSort: ({ sortKey, sortOrder }) => dispatch(actions.changeSort({ tableName, sortKey, sortOrder })),
    changeFilterText: ({ filterText }) => dispatch(actions.changeFilterText({ tableName, filterText })),
    sortData: ({ data, sortKey, sortOrder, filterText }) => dispatch(actions.sortData({ tableName, data, sortKey, sortOrder, filterText })),
    goToPage: ({ pageNumber, pageSize }) => dispatch(actions.changePage({ tableName, pageNumber, pageSize })),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(ReduxTable);
};