const debug = require('debug')('tymly-doc-generator')
const path = require('path')
module.exports = function generatePluginPages (fs, gatherer, utils) {
  const templatePath = utils.templatePath('plugin.md.ejs')
  debug(`Using template ${templatePath}`)

  const pluginList = gatherer.getPluginList()

  pluginList.forEach(
    (plugin) => {
      const ctx = utils.getBaseContext()
      const targetPath = path.join(
        utils.referenceRootPath(),
        'plugins',
        plugin.name,
        'README.md'
      )
      ctx.plugin = plugin
      ctx.stateResources = gatherer.getStateResourceList(
        {
          pluginName: plugin.name
        }
      )

      ctx.hasStateResources = Array.isArray(ctx.stateResources) && ctx.stateResources.length > 0

      ctx.blueprintDirs = gatherer.getBlueprintDirsList(
        {
          pluginName: plugin.name
        }
      )

      ctx.hasBlueprintDirs = Array.isArray(ctx.blueprintDirs) && ctx.blueprintDirs.length > 0

      ctx.services = gatherer.getServiceList(
        {
          pluginName: plugin.name
        }
      )

      ctx.hasServices = Array.isArray(ctx.services) && ctx.services.length > 0
      fs.copyTpl(
        templatePath,
        targetPath,
        ctx
      )
    }
  )

}
