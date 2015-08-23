'use strict';

var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var should = require('chai').should();
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');

var promisify = require('..');

chai.use(chaiAsPromised);

describe('js-promisify', function () {

  var dirPath = path.join(__dirname, 'tmp/');
  var filePath = dirPath + 'test.txt';
  var wrongFilePath = dirPath + 'no-test.txt';

  before(function () {
    // Make "tmp" folder
    fs.mkdirSync(dirPath);
  });

  after(function () {
    // Delete "tmp" folder
    rimraf.sync(dirPath);
  });

  describe('#promisify', function () {

    it('should reject if callback has err', function () {
      return promisify(fs.readFile, [wrongFilePath, {encoding: 'utf8'}])
        .should.be.rejected;
    });

    it('should succeed if callback returns correctly', function () {
      return promisify(fs.writeFile, [filePath, 'Hello world!'])
        .then(function () {
          return promisify(fs.readFile, [filePath, {encoding: 'utf8'}])
            .should.eventually.equal('Hello world!');
        });
    });

    it('should correctly bind the "this" variable', function (done) {
      function testThis (args, cb) {
        if (this === 'hello') {
          cb(null, true);
        } else {
          cb(null, false);
        }
      }
      return promisify(testThis, [''], 'hello')
        .should.eventually.equal(true).notify(done);
    });

  });

});
