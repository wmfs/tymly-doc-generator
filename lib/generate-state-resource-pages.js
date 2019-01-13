const debug = require('debug')('tymly-doc-generator')
const path = require('path')
module.exports = function generateStateResourcePages (fs, gatherer, utils) {
  const templatePath = utils.templatePath('state-resource.md.ejs')
  debug(`Using template ${templatePath}`)

  const pluginList = gatherer.getPluginList()

  pluginList.forEach(
    (plugin) => {
      const stateResources = gatherer.getStateResourceList(
        {
          pluginName: plugin.name
        }
      )
      stateResources.forEach(
        (stateResource) => {
          const ctx = utils.getBaseContext()
          const targetPath = path.join(
            utils.referenceRootPath(),
            'plugins',
            plugin.name,
            'state-resources',
            `${stateResource.name}.md`
          )
          ctx.plugin = plugin
          ctx.stateResource = stateResource
          fs.copyTpl(
            templatePath,
            targetPath,
            ctx
          )
        }
      )
    }
  )
}
