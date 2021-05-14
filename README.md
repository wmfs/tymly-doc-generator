# tymly-doc-generator



> A package to help us generate tymly-docs as Markdown files

Tymly-doc-generator (with the aid of the [Tymly-gatherer](https://github.com/wmfs/tymly-gatherer) package) generates a series of Markdown files that describe the contents of any _Tymly shaped repo_


## Install
```
$ npm install @wmfs/tymly-doc-generator
```

## TESTING

* If a `TYMLY_MONOREPO_PATH` environment variable is set, then the generation tests will generate locally.
 * **If `TYMLY_MONOREPO_PATH` isn't set, then only Standard.js tests will be performed.**

| Variable                    | Description |
| --------                    | ----------- |
| `TYMLY_MONOREPO_PATH`       |	**MANDATORY**: Where the root `tymly` dir can be found (inside this should be the `blueprints`, `plugins`, `packages` etc. dirs). So something like C:/development/tymly`. |
| `DEBUG`	                  | *Optional:* Supply if you want to see what's going on, e.g. `tymly-gatherer,tymly-doc-generator` |
| `TYMLY_DOCS_OUTPUT_PATH`    |	Where the `docs` dir is going to be written (note the `docs` dir itself will be written). So to target the [tymly-website](https://github.com/wmfs/tymly-website) project, you should set it to something like `C:/development/tymly-website`. **NOTE:** Some sub-directories (e.g. `/docs/reference`) will be deleted on generation, so make sure to get this one right! :smiley: |
| `TYMLY_DOCS_SKIP_GATHERING` |	*Optional:* Only supplying `true` will change behaviour. If you do this then the gathering phase will be omitted (relying instead on a previously-generated `$TYMLY_DOCS_OUTPUT_PATH/gathered-info.json` file... so you'll need to have generated with no skipping at least once before trying this). |

## Generating

With the environment variables set...

``` bash
npm run generate
```

## Testing
```
$ npm run test
```

## <a name='license'></a>License
[MIT](https://github.com/wmfs/tymly/packages/tymly-doc-generator/blob/master/LICENSE)
