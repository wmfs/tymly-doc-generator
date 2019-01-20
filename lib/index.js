const debug = require('debug')('tymly-doc-generator')
const path = require('path')
const Gatherer = require('@wmfs/tymly-gatherer')
const memFs = require('mem-fs')
const editor = require('mem-fs-editor')
const util = require('util')
const stopText = require('./templates/stop-text')

const generateIndexReadme = require('./generate-index-readme')
const generatePluginPages = require('./generate-plugin-pages')
const generateStateResourcePages = require('./generate-state-resource-pages')
const generateServicePages = require('./generate-service-pages')
const generateCardscriptPages = require('./generate-cardscript-pages')
const copyCardscriptAssets = require('./copy-cardscript-assets')
class Utils {
  constructor (options) {
    this.options = options
    this.stopText = stopText
  }

  getBaseContext () {
    return {
      stopText: this.stopText
    }
  }

  templatePath (templateName) {
    return path.join(__dirname, 'templates', templateName)
  }

  docsRootPath (rootFilename) {
    return path.join(this.options.outputDir, 'docs')
  }

  referenceRootPath (rootFilename) {
    return path.join(this.docsRootPath(), 'reference', rootFilename || '')
  }
}

module.exports = async function generate (options) {
  debug(`outputDir: ${options.outputDir}`)
  const gatherer = new Gatherer(options)
  if (!options.skipGathering) {
    // Gather all the things
    debug('COLLECTING')
    await gatherer.collect()
    const outputFilePath = path.join(options.outputDir, 'gathered-info.json')
    debug(`WRITING DATA TO ${outputFilePath}`)
    gatherer.writeToFile(
      {
        outputFilePath: outputFilePath
      }
    )
  } else {
    // Skip the gathering stage, so expecting a gathered-info.json file to be available.
    const gatheredInfoFilePath = path.join(options.outputDir, 'gathered-info.json')
    debug(`SKIPPED COLLECTION, LOADING FROM ${gatheredInfoFilePath}`)
    gatherer.readFromFile(
      {
        gatheredInfoFilePath: gatheredInfoFilePath
      }
    )
  }
  debug('GENERATING')
  const store = memFs.create()
  const fs = editor.create(store)
  const utils = new Utils(options)
  const deletePath = utils.referenceRootPath()
  debug(`Deleting... ${deletePath}`)
  fs.delete(deletePath)
  generateIndexReadme(fs, gatherer, utils)
  generatePluginPages(fs, gatherer, utils)
  generateStateResourcePages(fs, gatherer, utils)
  generateServicePages(fs, gatherer, utils)
  generateCardscriptPages(fs, gatherer, utils)
  copyCardscriptAssets(fs, gatherer, utils)
  const commit = util.promisify(fs.commit.bind(fs))
  await commit()
}

/*
  {
  async generate (options) {
    console.log('Options')
    console.log(JSON.stringify(options, null, 2))
    const gatherer = new Gatherer(options)

    await gatherer.collect()
    // for (const type of ['plugin', 'state-resource', 'service']) {
    //   await this.generateDocSummary(type, path.join(options.outputDir, type))
    // }
  }

  // async generateDocSummary (type, outputPath) {
  //   console.log('Generating Plugins Summary')
  //   const json = await gatherer()
  //
  //   ejs.renderFile(
  //     path.resolve(__dirname, `./templates/${type}-summary.md.ejs`),
  //     json,
  //     {},
  //     (err, str) => {
  //       if (err) {
  //         console.error(err)
  //       } else {
  //         fs.promises.mkdir(path.join(outputPath), {recursive: true})
  //           .catch(console.error)
  //           .then(
  //             fs.writeFileSync(
  //               path.join(outputPath, `${type}-summary.md`),
  //               str
  //             )
  //           )
  //       }
  //     }
  //   )
  // }
}
*/
