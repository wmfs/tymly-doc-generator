const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const Gatherer = require('@wmfs/tymly-gatherer')
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

const generateJson = async () => {
  return gatherer.listPluginSummary()
}

module.exports = {
  async generateAllDocs () {
    for (const type of ['plugin', 'state-resource', 'service']) {
      await this.generateDocSummary(type)
    }
  },

  async generateDocSummary (type) {
    console.log('Generating Plugins Summary')

    ejs.renderFile(
      path.resolve(__dirname, `./${type}-summary.md.ejs`),
      await generateJson(),
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
