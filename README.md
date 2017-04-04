# redux-table

Implementations of generic data tables with sorting and filtering are surprisingly hard to find in the React+Redux ecosystem. Here's a go at one.

At present, it provides no default styling, is incredibly non-performant, but implements a few key features.

## Usage

### Configuring your Store

```js
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Table, reducer as tableReducer, middleware } from 'redux-table';

const middlewares = [
  middleware,
];

const reducer = combineReducers({
  tables: tableReducer,
});

const enhancers = [
  applyMiddleware(...middlewares),
];

const store = createStore(
  reducer,
  compose(...enhancers)
);
```

### Using the Table

```js
<Table
  renderTable={customRenderTable}
  renderRow={customRenderRow}
  renderCell={customRenderCell}
  renderHeader={customRenderHeader}
  renderFilter={customRenderFilter}

  data={arrayOfData}
  headers={orderedArrayOfKeys}

  sort={keyedSortFunctions}
  showFilter={showFilterInput}

  selectDataKey={functionToProcessUniqueKeyFromRowData}
  />
```

## Custom Render Functions

`renderTable({ data, renderRows, renderHeaders, headers })` : overrides the whole render process. Receives sorted and filtered data, and some of the other render functions you may provide.

`renderHeader({ key, onClick, sortOrder })` : expected to return markup for a header item (`<th>`). `key` is the column name. `onClick` should be attached to the element. `sortOrder` is an integer in `-1...1` indicating the sort order of this column, `0` if this column is not sorted.

`renderRow({ index, rowData, renderCell, selectDataKey, headers })` : overrides the row render process. `index` is the row number. `rowData` is the individual data item this row represents. `renderCell` is the function used to render markup for a single cell item. `selectDataKey` should return a unique data value when passed the `rowData`. `headers` are the column keys, in order. Use these to iterate and render your cells.

`renderCell = ({ key, value })` : expected to return markup for a table cell (`<td>`). `key` is the React key which should be applied to the element. `value` is the raw value the cell should represent.

`renderFilter = ({ filterText, onChange })` : expected to return markup for the filter box. Filter input should be controlled, using `filterText` as the value, and the attached `onChange` handler.