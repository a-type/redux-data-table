import async from 'async';

export default ({ data, sortKey, sortOrder, filterText }) => new Promise((resolve, reject) => {
  async.filter(data, (item, cb) => {
    cb(null, Object.values(item).reduce(
      (matches, value) => matches ? true : ('' + value).includes(filterText),
      false
    ));
  }, (err, results) => {
    if (err) {
      reject(err);
      return;
    }

    async.sortBy(results, (item, cb) => {
      cb(null, item[sortKey]);
    }, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(sortOrder > 0 ? results : results.reverse());
    });
  });
});