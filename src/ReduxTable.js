import React from 'react';
import PropTypes from 'prop-types';
import DefaultTable from './components/Table';
import DefaultRow from './components/Row';
import DefaultCell from './components/Cell';
import DefaultHeader from './components/Header';
import DefaultFilter from './components/Filter';
import DefaultPagination from './components/Pagination';

export default class ReduxTable extends React.Component {
  static propTypes = {
    // user props
    tableName: PropTypes.string.isRequired,

    Table: PropTypes.func,
    Row: PropTypes.func,
    Cell: PropTypes.func,
    Header: PropTypes.func,
    Filter: PropTypes.func,
    Pagination: PropTypes.func,

    data: PropTypes.arrayOf(PropTypes.object),
    columnKeys: PropTypes.arrayOf(PropTypes.string),

    selectDataKey: PropTypes.func,

    pageSize: PropTypes.number,

    // redux props
    sortKey: PropTypes.string,
    sortOrder: PropTypes.number,
    filterText: PropTypes.string,
    currentPage: PropTypes.number,

    init: PropTypes.func.isRequired,
    changeSort: PropTypes.func.isRequired,
    changeFilterText: PropTypes.func.isRequired,
    goToPage: PropTypes.func.isRequired,

    sortedData: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    Table: DefaultTable,
    Row: DefaultRow,
    Cell: DefaultCell,
    Header: DefaultHeader,
    Filter: DefaultFilter,
    Pagination: DefaultPagination,

    data: [],
    columnKeys: null,
    sort: {},
    showFilter: true,

    selectDataKey: (data) => data.key || data.id || data.name || JSON.stringify(data),

    pageSize: 10,

    sortKey: 'id',
    sortOrder: 1,
    filterText: '',
    sortedData: [],
    currentPage: 0,
  };

  componentDidMount() {
    this.props.init({ tableName: this.props.tableName });
    this.onDirty(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { data, sortKey, sortOrder, filterText } = this.props;
    if (data !== nextProps.data ||
        sortKey !== nextProps.sortKey ||
        sortOrder !== nextProps.sortOrder ||
        filterText !== nextProps.filterText) {
      this.onDirty(nextProps);
    }
  }

  onHeaderClick = (key) => {
    const { sortOrder, sortKey, changeSort, tableName } = this.props;

    if (sortKey === key) {
      changeSort({ tableName, sortKey: key, sortOrder: -sortOrder });
    } else {
      changeSort({ tableName, sortKey: key, sortOrder: 1 });
    }
  };

  onFilterChange = (event) => {
    const { changeFilterText, tableName } = this.props;
    changeFilterText({ tableName, filterText: event.target.value });
  };

  onDirty = ({ data, sortOrder, sortKey, filterText, sortData, tableName }) => {
    sortData({ tableName, data, sortOrder, sortKey, filterText });
  };

  onPageChange = (pageNumber) => {
    const { goToPage, pageSize, tableName } = this.props;
    goToPage({ tableName, pageNumber, pageSize });
  };

  render() {
    const {
      Table,
      Row,
      Cell,
      Header,
      Filter,
      Pagination,
      showFilter,
      data,
      selectDataKey,
      filterText,
      sortKey,
      sortOrder,
      sortedData,
      sorting,
      pageSize,
      currentPage,
    } = this.props;

    const columnKeys = this.props.columnKeys || Object.keys(data[0] || {}) || [];

    const headers = (
      <Row index={-1}>
        {columnKeys.map((key) => (
          <Header
            key={key}
            columnKey={key}
            handleClick={() => this.onHeaderClick(key)}
            sortOrder={sortKey === key ? sortOrder : 0}
            sorting={sorting}
          />
        ))}
      </Row>
    );
    const rows = sortedData.slice(pageSize * currentPage, pageSize * (currentPage + 1)).map((rowData, index) => (
      <Row index={index} key={selectDataKey(rowData)} sorting={sorting}>
        {columnKeys.map((key) => (
          <Cell
            key={selectDataKey(rowData) + key}
            value={rowData[key]}
            rowValue={rowData}
            columnKey={key}
            sorting={sorting}
          />
        ))}
      </Row>
    ));
    const filter = (
      <Filter
        filterText={filterText}
        handleChange={this.onFilterChange}
        sorting={sorting}
      />
    );
    const pagination = (
      <Pagination
        goToPage={this.onPageChange}
        currentPage={currentPage}
        pageSize={pageSize}
        recordCount={sortedData.length}
        />
    );

    return (
      <Table
        pagination={pagination}
        filter={filter}
        headers={headers}
        rows={rows}
        sorting={sorting}
      />
    );
  }
}
