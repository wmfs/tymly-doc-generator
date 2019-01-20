const debug = require('debug')('tymly-doc-generator')
const path = require('path')
const baseIconPath = require('@wmfs/cardscript-icons')
module.exports = function copyCardscriptIcons (fs, gatherer, utils) {
  const targetPath = path.join(
    utils.docsRootPath(),
    '.vuepress',
    'public',
    'cardscript-icons'
  )

  debug(`Deleting any existing cardscript-icons's from ${targetPath}`)
  fs.delete(targetPath)

  const iconPath = path.join(baseIconPath)
  debug(`Copying Cardscript icons from ${iconPath} to ${targetPath}`)
  fs.copy(
    iconPath,
    targetPath
  )
  const indexPath = path.join(targetPath, 'index.js')
  debug(`Deleting cardscript-icons's index.js file from ${indexPath}`)
  fs.delete(indexPath)
}
