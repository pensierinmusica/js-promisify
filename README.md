# JS Promisify

[![Travis](https://img.shields.io/travis/pensierinmusica/js-promisify.svg)](https://travis-ci.org/pensierinmusica/js-promisify)
[![David](https://img.shields.io/david/pensierinmusica/js-promisify.svg)](https://www.npmjs.com/package/js-promisify)
[![npm](https://img.shields.io/npm/v/js-promisify.svg)](https://www.npmjs.com/package/js-promisify)

## Introduction

JS Promisify is a [npm](http://npmjs.org) minimal and well-tested async module for [NodeJS](http://nodejs.org/), that **converts NodeJS async style functions to [native JS promises](http://www.html5rocks.com/en/tutorials/es6/promises/)** (if they're supported by the underlying JavaScript engine, like in Node >= 4.0.0).

For example, it can be used to convert the NodeJS native [file system library](https://nodejs.org/api/fs.html) (`fs`), to easily perform file operations with promises.

## Install

`npm install js-promisify`

(add "--save" if you want the module to be automatically added to your project's "package.json" dependencies)


## Usage

```js
promisify(fun, args, [self])
```

- `fun` can be any function with a callback argument that follows the Node JS async function pattern signature (i.e. the callback is the last argument and has a signature `function(err, data)`).
- `args` is an array containing all the arguments that need to be passed to `fun`, excluding the callback.
- `self` (optional) is what the variable `this` should be bound to when `fun` is called with the arguments provided through the `args` array.

##### Example
```js
var promisify = require(js-promisify);
var fs = require('fs');

promisify(fs.readFile, ['path/to/myfile.txt', {encoding: 'utf8'}])
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.log(err);
  })
```

***

MIT License