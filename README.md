# redux-data-table

## Notice

Although it was a fairly usable solution for local data, I found that this approach to creating a table in Redux was not very compatible with data fetched from external sources. I also found that it's often better for an application to sort data in the Redux store in many circumstances, not locally in the table. Sorting data in the store means you can keep it consistent throughout the application and won't have to re-sort on each render. So I've concluded that this library may have been misguided for most use cases and won't be maintaining it. Perhaps poking through the code will give you some ideas for your own projects, but I wouldn't suggest picking it up for anything serious.



Implementations of generic data tables with sorting and filtering are surprisingly hard to find in the React+Redux ecosystem. Here's a go at one.

redux-data-table is designed to be easy to use, but not necessarily performant or opinionated. To get a basic table, you can go ahead and jump right in by passing only a `data` prop to your created form and see how it works. Most of the customization revolves around syling the presentational components of the table.

Under the hood, redux-data-table prefers to use a WebWorker to sort your data, so it will hopefully be able to keep up with large data sets. This may not be an optimal solution in real life usage, though. Perhaps you'd like to fork and PR a new sorting method? It's all in `middleware.js`.

## Usage

### Configuring your Store

```js
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Table, reducer as tableReducer, middleware } from 'redux-data-table';

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
import { ReduxTable } from 'redux-data-table';
// all props are optional
<ReduxTable
  tableName="example"

  Table={CustomTable}
  Row={CustomRow}
  Cell={CustomCell}
  Header={CustomHeader}
  Filter={CustomFilter}
  Pagination={CustomPagination}

  data={arrayOfData}
  columnKeys={orderedArrayOfKeys}
  selectDataKey={functionToProcessUniqueKeyFromRowData}
  sortableColumnKeys={arrayOfColumnKeysWhichAreSortable}
  />
```

## Custom Presentational Components

### Table

Props: `{ filter, rows, headers, sorting }`

`filter`, `rows` and `headers` are rendered markup. `filter` is the rendered `Filter` component; place it wherever you like in your table. `rows` is a list of `Row` elements (presumably `tr`s), `headers` is the rendered `Row` of `Header` elements (presumably one `tr`). Recommended layout is to render a `<table>` with a `<thead>` containing `headers` and a `<tbody>` containing `rows`.

`sorting` is a boolean which tells you if the table is in the process of sorting data. Use this to, for instance, render the body in such a way that it's clear there's work going on.

### Row

Props: `{ index, children, sorting }`

`index` is the index (line number) of this row. `-1` indicates the row is the header row. `children` are the contained `Cell` elements, presumably a list of `td`s.

`sorting` is the same as `Table`; a boolean that indicates if the table is currently sorting.

### Cell

Props: `{ value, columnKey, sorting }`

`value` is the raw value fetched from the data object for this column key. If it's not renderable, you'll need to do the logic to make it so. `columnKey` is provided to tell you what column this `Cell` is being rendered in to aid your rendering logic. A suggested pattern if you have custom per-column rendering needs is to create several specialized Cell components and have your main `Cell` component selectively render these based on `columnKey`.

`sorting` is the same as `Table`; a boolean that indicates if the table is currently sorting.

### Header

Props: `{ columnKey, handleClick, sortOrder, sorting, sortable }`

`columnKey` is the key for this column. You might render this directly, or prettify it somehow. `handleClick` must be attached to your element in order for clicking it to toggle column sorting. `sortOrder` indicates the sort order of this header's column. It's `0` if the table is not being sorted on this column, otherwise it's `1` or `-1`.

`sorting` is the same as `Table`; a boolean that indicates if the table is currently sorting.

`sortable` is true if the header is sortable. It's false if it's not. You can still bind `handleClick` on a non-sortable header, but nothing will happen when you click it.

### Filter

Props: `{ filterText, handleChange, sorting }`

`filterText` is the controlled value of the filter text, put this on an `input`'s `value`. `handleChange` should be called whenever the `input` changes to update the filter.

`sorting` is the same as `Table`; a boolean that indicates if the table is currently sorting.

### Pagination

Props: `{ currentPage, goToPage }`

`currentPage` is the index of the current page. Note that, if you change the filter state, the current page will reset to 0. This is to prevent filters from reducing the result size such that no results are visible on the current page, even if some results are present.

`goToPage` accepts an integer page number. Compute your page using the `currentPage` value. Negative page numbers will wrap to the end of the page list. For instance, `-1` is the last page.

When writing your own pagination component, if you'd like to provide a text input to jump to a particular page, you'll need to just store that in the component state. redux-form doesn't keep track of a value for that kind of input. Feel free to pull the value from the `currentPage` props when the props change, so that your input will react to changes.

## Data Props

### tableName

**Required**

A unique key for your table. This key will be used to store the table's state in the Redux store. Don't leave home without it!

### data

This is an array of objects to represent in the table. Each object should have the same shape. Objects are preferrably flat key-value maps, where values are all renderable.

redux-data-table has no opinions about how you get your data, and isn't concerned with whether or not the data is currently loading. It's possible the library could be extended to understand loading states, but currently the best approach is to only render a redux-data-table when data is ready, and render something else while things are loading.

### columnKeys

An array of string keys which correspond to the shape of your data. So if your data objects look like `{ a: 1, b: 2, c: 3 }`, you'd probably want to pass `['a', 'b', 'c']` as your `columnKeys`. You could remove columns from the table by only passing a subset of the keys in your data. By default, redux-data-table will try to infer your column keys once data is loaded by using the result of `Object.keys(data[0])`.

### selectDataKey

A function which is passed one of your data objects, and is expected to return a unique key to identify that object. For instance, if your data contains unique `id` props, your `selectDataKey` function might be `(data) => data.id`. But actually, the default behavior of redux-data-table would already work for you: first it tries `data.key`, then `data.id`, then `data.name`, and then it will stringify the whole data object. If your data doesn't have an `id`, `key`, or `name`, it's highly recommended you provide a `selectDataKey`.

### sortableColumnKeys

An array of string keys which indicate which columns should be sortable. If this prop is omitted, all columns are considered sortable.
