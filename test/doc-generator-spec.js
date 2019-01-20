/* eslint-env mocha */

const process = require('process')
const generate = require('../lib/index')
const path = require('path')
describe('Generate the docs!', function () {
  this.timeout(process.env.TIMEOUT || 500000)

  it('should generate some docs!', async () => {
    if (process.env.TYMLY_MONOREPO_PATH) {
      const options = {
        skipGathering: false,
        outputDir: path.resolve(__dirname, 'generated'),
        tymlyRootPath: process.env.TYMLY_MONOREPO_PATH,
        assetsOutputRootDir: path.resolve(__dirname, '..', 'output'),
        pluginVersionSource: 'local'
      }
      await generate(options)
    }
  })
})
