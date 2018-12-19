const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
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
    this.options = options
  }

  async generateJson () {
    return gatherer.listPluginSummary()
  }

  async generateAllDocs () {
    for (const type of ['plugin', 'state-resource', 'service']) {
      this.generateDocSummary(type)
    }
  }

  async generateDocSummary (type) {
    console.log('Generating Plugins Summary')

    ejs.renderFile(
      path.resolve(__dirname, `./${type}-summary.md.ejs`),
      this.generateJson(),
      {},
      (err, str) => {
        if (err) {
          console.error(err)
        } else {
          fs.writeFileSync(
            path.join(this.options.rootDir, `${type}-summary.md`),
            str
          )
        }
      }
    )
  }
}
