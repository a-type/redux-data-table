import React from 'react';
import { connect } from 'react-redux';
import genericCompare from './genericCompare';
import Table from './components/Table';
import TableBody from './components/TableBody';
import Row from './components/Row';
import Cell from './components/Cell';
import TableHeader from './components/TableHeader';
import Header from './components/Header';
import SortArrow from './components/SortArrow';
import Filter from './components/Filter';

const renderTable = ({ data, renderRows, renderHeaders, headers }) =>
  (
  <Table>
    <TableHeader>
      {renderHeaders({ headers })}
    </TableHeader>
    <TableBody>
      {renderRows({ data })}
    </TableBody>
  </Table>
);

const renderHeader = ({ key, onClick, sortOrder }) => (
  <Header key={key} onClick={onClick}>
    {key}
    <SortArrow order={sortOrder} />
  </Header>
);

const renderRow = ({ index, rowData, renderCell, selectDataKey, headers }) => (
  <Row key={selectDataKey(rowData)}>
    {headers.map((key) => renderCell({ key: selectDataKey(rowData) + rowData[key], value: rowData[key] }))}
  </Row>
);

const renderCell = ({ key, value }) => {
  return (<Cell key={key}>{'' + value}</Cell>);
};

const renderFilter = ({ filterText, onChange }) => {
  return <Filter filterText={filterText} onChange={onChange} />;
};

class ReduxTable extends React.Component {
  static propTypes = {
    // user props
    renderTable: React.PropTypes.func,
    renderRow: React.PropTypes.func,
    renderCell: React.PropTypes.func,
    renderHeader: React.PropTypes.func,
    renderFilter: React.PropTypes.func,

    data: React.PropTypes.arrayOf(React.PropTypes.object),
    headers: React.PropTypes.arrayOf(React.PropTypes.string),

    sort: React.PropTypes.objectOf(React.PropTypes.func),
    showFilter: React.PropTypes.bool,

    selectDataKey: React.PropTypes.func,

    // redux props
    sortKey: React.PropTypes.string.isRequired,
    sortOrder: React.PropTypes.number.isRequired,
    filterText: React.PropTypes.string.isRequired,

    changeSort: React.PropTypes.func.isRequired,
    changeFilterText: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    renderTable,
    renderRow,
    renderCell,
    renderHeader,
    renderFilter,

    data: [],
    headers: null,
    sort: {},
    showFilter: true,

    selectDataKey: (data) => data.id || data.name || JSON.stringify(data),
  };

  onHeaderClick = (key) => {
    const { sortOrder, sortKey, changeSort } = this.props;

    if (sortKey === key) {
      changeSort({ sortKey: key, sortOrder: -sortOrder });
    } else {
      changeSort({ sortKey: key, sortOrder: 1 });
    }
  };

  onFilterChange = (event) => {
    const { changeFilterText } = this.props;
    changeFilterText({ filterText: event.target.value });
  };

  render() {
    const {
      renderTable,
      renderRow,
      renderCell,
      renderHeader,
      renderFilter,
      showFilter,
      data,
      sort,
      headers,
      selectDataKey,
      filterText,
      sortKey,
      sortOrder
    } = this.props;

    const finalHeaders = headers || Object.keys(data[0] || {}) || [];
    const filteredData = filterText ? data.filter((item) =>
      Object.values(item).reduce(
        (matches, value) => matches ? true : ('' + value).includes(filterText),
        false
      )
    ) : data;
    const sortedData = sortKey ? filteredData.sort((item, other) => {
      const aValue = item[sortKey];
      const bValue = other[sortKey];
      if (sort[sortKey]) {
        return sortOrder * sort(aValue, bValue);
      } else {
        return sortOrder * genericCompare(aValue, bValue);
      }
    }) : filteredData;

    return (
      <div>
        {showFilter ? renderFilter({ filterText, onChange: this.onFilterChange }) : null}
        {renderTable({
          data: sortedData,
          headers: finalHeaders,
          renderHeaders: ({ headers }) => (
            <Row>
              {headers.map((key) => renderHeader({ key, onClick: () => this.onHeaderClick(key), sortOrder: sortKey === key ? sortOrder : 0 }))}
            </Row>
          ),
          renderRows: ({ data }) =>
            data.map((rowData, index) =>
              renderRow({ rowData, index, renderCell, headers: finalHeaders, selectDataKey })
            ),
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sortKey: state.tables.sortKey,
  sortOrder: state.tables.sortOrder,
  filterText: state.tables.filterText,
});

const mapDispatchToProps = (dispatch) => ({
  changeSort: ({ sortKey, sortOrder }) => dispatch({ type: 'CHANGE_SORT', payload: { sortKey, sortOrder } }),
  changeFilterText: ({ filterText }) => dispatch({ type: 'CHANGE_FILTER_TEXT', payload: { filterText } }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxTable);