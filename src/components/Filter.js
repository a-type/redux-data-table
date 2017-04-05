import React from 'react';

const Filter = ({ filterText, handleChange }) => (
  <input onChange={handleChange} value={filterText} type="text" />
);

export default Filter;