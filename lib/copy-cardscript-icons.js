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
  const iconPath = path.join(baseIconPath)
  debug(`Copying Cardscript icons from ${iconPath} to ${targetPath}`)
  fs.copy(
    iconPath,
    targetPath
  )
}
