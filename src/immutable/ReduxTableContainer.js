import { connect } from 'react-redux';
import * as actions from '../actions';
import ReduxTable from '../ReduxTable';

const mapStateToProps = (state, ownProps) => {
  const tables = state.get('tables');
  if (tables[ownProps.tableName]) {
    return {
      sortKey: tables[ownProps.tableName].sortKey,
      sortOrder: tables[ownProps.tableName].sortOrder,
      filterText: tables[ownProps.tableName].filterText,
      sortedData: tables[ownProps.tableName].sortedData,
      sorting: tables[ownProps.tableName].sorting,
      currentPage: tables[ownProps.tableName].currentPage,
    };
  } else {
    return {};
  }
};

const mapDispatchToProps = (dispatch) => ({
  init: ({ tableName }) => dispatch(actions.init({ tableName })),
  changeSort: ({ tableName, sortKey, sortOrder }) => dispatch(actions.changeSort({ tableName, sortKey, sortOrder })),
  changeFilterText: ({ tableName, filterText }) => dispatch(actions.changeFilterText({ tableName, filterText })),
  sortData: ({ tableName, data, sortKey, sortOrder, filterText }) => dispatch(actions.sortData({ tableName, data, sortKey, sortOrder, filterText })),
  goToPage: ({ tableName, pageNumber, pageSize }) => dispatch(actions.changePage({ tableName, pageNumber, pageSize })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxTable);