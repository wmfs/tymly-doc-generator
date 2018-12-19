const ejs = require('ejs')
const Gatherer = require('./../node_modules/@wmfs/tymly-gatherer')
const gatherer = new Gatherer(
  {
    sourceDir: 'C:\\development\\tymly',
    config: {
      plugins: true,
      stateResources: true,
      services: true
    }
  }
)

module.exports = class DocGenerator {
  constructor (options) {
    console.log('Generating Tymly Docs')
  }

  async generatePluginSummary () {
    console.log('Generating Plugins Summary')
  }

  async generateStateResourcesSummary () {
    console.log('Generating State Resources Summary')
  }

  async generateServicesSummary () {
    console.log('Generating Services Summary')
  }
}
