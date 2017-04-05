import React from 'react';

const Table = ({ filter, rows, headers, sorting }) => (
  <table>
    <caption style={{ textAlign: 'right' }}>{filter}</caption>
    <thead>
      {headers}
    </thead>
    <tbody style={{ opacity: sorting ? 0.5 : 1 }}>
      {rows}
    </tbody>
  </table>
);

export default Table;