import React from 'react';
import SortArrow from './SortArrow';

const Header = ({ columnKey, handleClick, sortOrder, sortable }) => (
  <th style={{ cursor: sortable ? 'pointer' : 'default' }} onClick={handleClick}>
    {columnKey}
    {sortable ? <SortArrow order={sortOrder} /> : null}
  </th>
);

export default Header;