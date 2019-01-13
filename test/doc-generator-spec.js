/* eslint-env mocha */

const process = require('process')
const generate = require('../lib/index')
const path = require('path')
describe('Generate the docs!', function () {
  this.timeout(process.env.TIMEOUT || 500000)

  it('should generate some docs!', async () => {
    const options = {
      skipGathering: true,
      outputDir: path.resolve(__dirname, 'generated'),
      tymlyRootPath: process.env.TYMLY_MONOREPO_PATH,
      cardscriptRootPath: process.env.CARDSCRIPT_MONOREPO_PATH,
      assetsOutputRootDir: path.resolve(__dirname, '..', 'output'),
      pluginVersionSource: 'local'
    }
    await generate(options)
  })
})
