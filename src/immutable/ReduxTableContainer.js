import { connect } from 'react-redux';
import ReduxTable from '../ReduxTable';

const mapStateToProps = (state, ownProps) => state.get('tables')[ownProps.tableName] ? {
  sortKey: state.tables[ownProps.tableName].sortKey,
  sortOrder: state.tables[ownProps.tableName].sortOrder,
  filterText: state.tables[ownProps.tableName].filterText,
  sortedData: state.tables[ownProps.tableName].sortedData,
  sorting: state.tables[ownProps.tableName].sorting,
  currentPage: state.tables[ownProps.tableName].currentPage,
} : {};

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