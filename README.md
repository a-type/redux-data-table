# redux-table

Implementations of generic data tables with sorting and filtering are surprisingly hard to find in the React+Redux ecosystem. Here's a go at one.

At present, it provides no default styling, is incredibly non-performant, but implements a few key features.

## Warning: Early Stages

The API may change on any particular day. I'm hoping to use this in a production project at some point, so I hope this lib will keep getting updates, but no guarantees. I don't think this is ready for production yet, anyway... the sorting and filtering is run right in the render thread right now.

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
// all props are optional
<Table
  Table={CustomTable}
  Row={CustomRow}
  Cell={CustomCell}
  Header={CustomHeader}
  Filter={CustomFilter}

  data={arrayOfData}
  captionKeys={orderedArrayOfKeys}
  selectDataKey={functionToProcessUniqueKeyFromRowData}
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

Props: `{ columnKey, handleClick, sortOrder, sorting }`

`columnKey` is the key for this column. You might render this directly, or prettify it somehow. `handleClick` must be attached to your element in order for clicking it to toggle column sorting. `sortOrder` indicates the sort order of this header's column. It's `0` if the table is not being sorted on this column, otherwise it's `1` or `-1`.

`sorting` is the same as `Table`; a boolean that indicates if the table is currently sorting.

### Filter

Props: `{ filterText, handleChange, sorting }`

`filterText` is the controlled value of the filter text, put this on an `input`'s `value`. `handleChange` should be called whenever the `input` changes to update the filter.

`sorting` is the same as `Table`; a boolean that indicates if the table is currently sorting.

## Data Props

### data

This is an array of objects to represent in the table. Each object should have the same shape. Objects are preferrably flat key-value maps, where values are all renderable.

redux-table has no opinions about how you get your data, and isn't concerned with whether or not the data is currently loading. It's possible the library could be extended to understand loading states, but currently the best approach is to only render a redux-table when data is ready, and render something else while things are loading.

### columnKeys

An array of string keys which correspond to the shape of your data. So if your data objects look like `{ a: 1, b: 2, c: 3 }`, you'd probably want to pass `['a', 'b', 'c']` as your `columnKeys`. You could remove columns from the table by only passing a subset of the keys in your data. By default, redux-table will try to infer your column keys once data is loaded by using the result of `Object.keys(data[0])`.

### selectDataKey

A function which is passed one of your data objects, and is expected to return a unique key to identify that object. For instance, if your data contains unique `id` props, your `selectDataKey` function might be `(data) => data.id`. But actually, the default behavior of redux-table would already work for you: first it tries `data.key`, then `data.id`, then `data.name`, and then it will stringify the whole data object. If your data doesn't have an `id`, `key`, or `name`, it's highly recommended you provide a `selectDataKey`.