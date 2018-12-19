/* eslint-env mocha */

const docGenerator = require('../lib/index')

describe('test gatherer functions', function () {
  this.timeout(process.env.TIMEOUT || 5000)

  it('should generate some docs!', async () => {
    docGenerator.generateAllDocs()
  })
})
