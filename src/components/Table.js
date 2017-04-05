import React from 'react';

const Table = ({ rows, headers, sorting }) => (
  <table>
    <thead>
      {headers}
    </thead>
    <tbody style={{ opacity: sorting ? 0.5 : 1 }}>
      {rows}
    </tbody>
  </table>
);

export default Table;