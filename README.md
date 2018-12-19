# tymly-doc-generator
> A package to help us generate tymly-docs as Markdown files

Tymly-doc-generator (with the aid of the Tymly-gatherer package) generates a series of Markdown files that describe the contents of any _Tymly shaped repo_

## Usage
In order to generate docs, this package exposes two functions:
* async generateDocSummary(type)
    > which writes a summary Markdown file for the specified param 'type' <br/> The type should be of type string, as follows:
    > * 'plugin'
    > * 'state-resource'
    > * 'service' <br/><br/>
    The file is written to the dir './output' with the name ```TYPE-summary.md```
* async generateAllDocs()
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
PLUGINS_PATH=C:/path/to/your/tymly/plugins
```
