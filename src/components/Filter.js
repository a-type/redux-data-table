import React from 'react';

const Filter = ({ filterText, handleChange }) => (
  <span>
    <label>Filter: </label>
    <input onChange={handleChange} value={filterText} type="text" />
  </span>
);

export default Filter;