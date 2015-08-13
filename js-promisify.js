'use strict';

module.exports = function (fun, args) {
  return new Promise(function (resolve, reject) {
    args.push(function (err, data) {
      err && reject(err);
      resolve(data);
    })
    fun.apply(null, args);
  });
};