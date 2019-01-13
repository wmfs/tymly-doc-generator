const debug = require('debug')('tymly-doc-generator')

module.exports = function generateIndexReadme (fs, gatherer, utils) {
  const templatePath = utils.templatePath('index-readme.md.ejs')
  const targetPath = utils.referenceRootPath('README.md')
  debug(`Using template ${templatePath}`)
  debug(`Writing to ${targetPath}`)
  const ctx = utils.getBaseContext()
  ctx.plugins = gatherer.getPluginList()
  ctx.blueprintDirs = gatherer.getBlueprintDirsList({})
  ctx.stateResources = gatherer.getStateResourceList({})
  ctx.services = gatherer.getServiceList({})
  ctx.hasBlueprintDirs = Array.isArray(ctx.blueprintDirs) && ctx.blueprintDirs.length > 0

  fs.copyTpl(
    templatePath,
    targetPath,
    ctx
  )
}
