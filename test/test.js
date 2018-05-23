'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const promisify = require('..');

chai.should();
chai.use(chaiAsPromised);

describe('js-promisify', () => {

  const dirPath = path.join(__dirname, 'tmp/');
  const filePath = dirPath + 'test.txt';
  const wrongFilePath = dirPath + 'no-test.txt';

  before(() => fs.mkdirSync(dirPath)); // Make "tmp" folder

  after(() => rimraf.sync(dirPath)); // Delete "tmp" folder

  describe('#promisify', () => {

    it(
      'should reject if callback has err',
      () => promisify(fs.readFile, [wrongFilePath, {encoding: 'utf8'}]).should.be.rejected
    );

    it(
      'should succeed if callback returns correctly',
      () => promisify(fs.writeFile, [filePath, 'Hello world!'])
        .then(() => promisify(fs.readFile, [filePath, {encoding: 'utf8'}]).should.eventually.equal('Hello world!'))
    );

    it('should correctly bind the "this" variable', () => {
      function testThis (args, cb) {
        if (this === 'hello') cb(null, true);
        else cb(null, false);
      }
      return promisify(testThis, [''], 'hello').should.eventually.equal(true);
    });

  });

});
