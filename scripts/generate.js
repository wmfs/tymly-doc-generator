const generate = require('../lib')
const path = require('path')
const process = require('process')

async function main () {
  let skipGathering = process.env.TYMLY_DOCS_SKIP_GATHERING
  if (skipGathering === 'true') {
    skipGathering = true
  } else {
    skipGathering = false
  }
  const options = {
    skipGathering: skipGathering,
    outputDir: process.env.TYMLY_DOCS_OUTPUT_PATH,
    tymlyRootPath: process.env.TYMLY_MONOREPO_PATH,
    cardscriptRootPath: process.env.CARDSCRIPT_MONOREPO_PATH,
    assetsOutputRootDir: path.resolve(__dirname, '..', 'output'),
    pluginVersionSource: 'local'
  }
  await generate(options)
}

(async () => {
  await main()
  console.log('Done.')
})().catch(e => {
  // Deal with the fact the chain failed
  console.error(e)
  throw (new Error(e))
})
