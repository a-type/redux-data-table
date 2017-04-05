import React from 'react';
import DefaultTable from './components/Table';
import DefaultRow from './components/Row';
import DefaultCell from './components/Cell';
import DefaultHeader from './components/Header';
import DefaultFilter from './components/Filter';

export default class ReduxTable extends React.Component {
  static propTypes = {
    // user props
    Table: React.PropTypes.func,
    Row: React.PropTypes.func,
    Cell: React.PropTypes.func,
    Header: React.PropTypes.func,
    Filter: React.PropTypes.func,

    data: React.PropTypes.arrayOf(React.PropTypes.object),
    columnKeys: React.PropTypes.arrayOf(React.PropTypes.string),

    selectDataKey: React.PropTypes.func,

    // redux props
    sortKey: React.PropTypes.string,
    sortOrder: React.PropTypes.number,
    filterText: React.PropTypes.string,

    init: React.PropTypes.func.isRequired,
    changeSort: React.PropTypes.func.isRequired,
    changeFilterText: React.PropTypes.func.isRequired,

    sortedData: React.PropTypes.arrayOf(React.PropTypes.object),
  };

  static defaultProps = {
    Table: DefaultTable,
    Row: DefaultRow,
    Cell: DefaultCell,
    Header: DefaultHeader,
    Filter: DefaultFilter,

    data: [],
    columnKeys: null,
    sort: {},
    showFilter: true,

    selectDataKey: (data) => data.key || data.id || data.name || JSON.stringify(data),

    sortKey: 'id',
    sortOrder: 1,
    filterText: '',
    sortedData: [],
  };

  componentDidMount() {
    this.props.init();
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

  onDirty = ({ data, sortOrder, sortKey, filterText, sortData }) => {
    sortData({ data, sortOrder, sortKey, filterText });
  };

  render() {
    const {
      Table,
      Row,
      Cell,
      Header,
      Filter,
      showFilter,
      data,
      selectDataKey,
      filterText,
      sortKey,
      sortOrder,
      sortedData,
      sorting,
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
    const rows = sortedData.map((rowData, index) => (
      <Row index={index} key={selectDataKey(rowData)} sorting={sorting}>
        {columnKeys.map((key) => (
          <Cell
            key={selectDataKey(rowData) + key}
            value={rowData[key]}
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

    return (
      <Table
        filter={filter}
        headers={headers}
        rows={rows}
        sorting={sorting}
      />
    );
  }
}
