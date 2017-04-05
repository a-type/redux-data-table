import React from 'react';
import SortArrow from './SortArrow';

const Header = ({ columnKey, handleClick, sortOrder }) => (
  <th style={{ cursor: 'pointer' }} onClick={handleClick}>
    {columnKey}
    <SortArrow order={sortOrder} />
  </th>
);

export default Header;