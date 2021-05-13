const debug = require('debug')('tymly-doc-generator')
const path = require('path')
const baseAssetPath = require('@wmfs/cardscript-assets')

module.exports = function copyCardscriptIcons (fs, gatherer, utils) {
  const targetPath = path.join(
    utils.docsRootPath(),
    '.vuepress',
    'public',
    'cardscript-assets'
  )

  debug(`Deleting any existing cardscript-assets from ${targetPath}`)
  fs.delete(targetPath)

  debug(`Copying Cardscript assets from ${baseAssetPath} to ${targetPath}`)
  fs.copy(baseAssetPath, targetPath)

  const indexPath = path.join(targetPath, 'index.js')

  debug(`Deleting cardscript-icons's index.js file from ${indexPath}`)
  fs.delete(indexPath)
}
