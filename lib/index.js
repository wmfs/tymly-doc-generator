const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const gatherer = require('./gatherer')

module.exports = {
  async generateAllDocs () {
    for (const type of ['plugin', 'state-resource', 'service']) {
      await this.generateDocSummary(type, `./output/${type}`)
    }
  },

  async generateDocSummary (type, outputPath) {
    console.log('Generating Plugins Summary')
    const json = await gatherer()

    ejs.renderFile(
      path.resolve(__dirname, `./templates/${type}-summary.md.ejs`),
      json,
      {},
      (err, str) => {
        if (err) {
          console.error(err)
        } else {
          fs.promises.mkdir(path.join(outputPath), { recursive: true })
            .catch(console.error)
            .then(
              fs.writeFileSync(
                path.join(outputPath, `${type}-summary.md`),
                str
              )
            )
        }
      }
    )
  }
}
