import genericCompare from './genericCompare';

onmessage = ({ data: { data, filterText, sortKey, sortOrder } }) => {
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