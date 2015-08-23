'use strict';

module.exports = function (fun, args, self) {
  return new Promise(function (resolve, reject) {
    args.push(function (err, data) {
      err && reject(err);
      resolve(data);
    })
    fun.apply(self, args);
  });
};