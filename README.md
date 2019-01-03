[![Build Status](https://travis-ci.com/thearavind/reactive-fetch.svg?branch=master)](https://travis-ci.com/thearavind/reactive-fetch)
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
<a href="https://badge.fury.io/js/reactive-fetch"><img src="https://badge.fury.io/js/reactive-fetch.svg" alt="npm version" height="18"></a>
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest) [![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)

# REACTIVE FETCH

A wrapper around native fetch api which follows RxJs observer pattern

### Getting started
Install reactive fetch via npm

```
npm install reactive-fetch
``` 

or using Yarn 

```
yarn add reactive-fetch
```

### Example
```
import fetch from 'reactive-fetch'

fetch("http://127.0.0.1:8080/users").subscribe(
  (next) => console.log("Response", next),
  (error) => console.log("Error", error)
)
```

### Contributions
New ideas and contributions to the project are welcomed, feel free to create PR's and to open issues if something needs to be changed.