# tymly-doc-generator

[![Build Status](https://travis-ci.com/wmfs/tymly-doc-generator.svg?token=nmm9if9qp6sBNJ5PjroH&branch=master)](https://travis-ci.com/wmfs/safe-and-well-blueprint)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/wmfs/tymly-doc-generator/LICENSE)


> A package to help us generate tymly-docs as Markdown files

Tymly-doc-generator (with the aid of the [Tymly-gatherer](https://github.com/wmfs/tymly-gatherer) package) generates a series of Markdown files that describe the contents of any _Tymly shaped repo_

## Usage
In order to generate docs, this package exposes two functions:
* ```async generateDocSummary(type)```
    > which writes a summary Markdown file for the specified param 'type' <br/> The type should be of type string, as follows:
    > * 'plugin'
    > * 'state-resource'
    > * 'service' <br/><br/>
    The file is written to the dir './output' with the name ```TYPE-summary.md```
* ```async generateAllDocs()```
    > which simply calls ``` generateDocSummary() ``` for all possible types


## Install
```
$ npm install @wmfs/tymly-doc-generator
```


## Testing
```
$ npm run test
```

### Environment Variables
```
TYMLY_MONOREPO_PATH=C:/development/tymly
CARDSCRIPT_MONOREPO_PATH=c:/development/tymly/cardscripts/cardscript
```


## <a name='license'></a>License
[MIT](https://github.com/wmfs/tymly/packages/tymly-doc-generator/blob/master/LICENSE)
