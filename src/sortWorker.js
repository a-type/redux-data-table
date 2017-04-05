const code = '(' + function() {
  onmessage = ({ data: { data, filterText, sortKey, sortOrder } }) => {
    const genericCompare = (a, b) => {
      if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b);
      } else if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
      } else {
        return ('' + a).localeCompare('' + b);
      }
    };

    const filterFn = filterText ?
      (data) => data.filter((item) =>
        Object.values(item).reduce(
          (matches, value) => matches ? true : ('' + value).includes(filterText),
          false
        )) :
      (data) => data;
    const sortFn = sortKey ?
      (data) => data.sort((item, other) =>
        sortOrder * genericCompare(item[sortKey], other[sortKey])
      ) :
      (data) => data;

    const filteredData = filterFn(data);
    const sortedData = sortFn(filteredData);

    postMessage({ sortedData });
  };
}.toString() + ')()';

const blobUrl = URL.createObjectURL(new Blob([
  [code],
  { type: 'application/javascript' }
]));

let worker;
if (window.worker) {
  worker = new Worker(blobUrl);
  URL.revokeObjectURL(blobUrl);
} else {
  worker = null;
}

export default worker;