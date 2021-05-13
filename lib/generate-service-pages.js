const debug = require('debug')('tymly-doc-generator')
const path = require('path')

module.exports = function generateServicePages (fs, gatherer, utils) {
  const templatePath = utils.templatePath('service.md.ejs')

  debug(`Using template ${templatePath}`)

  const pluginList = gatherer.getPluginList()

  for (const plugin of pluginList) {
    const services = gatherer.getServiceList({ pluginName: plugin.name })

    for (const service of services) {
      const ctx = utils.getBaseContext()
      const targetPath = path.join(
        utils.referenceRootPath(),
        'plugins',
        plugin.name,
        'services',
        `${service.name}.md`
      )
      ctx.plugin = plugin
      ctx.service = service
      fs.copyTpl(
        templatePath,
        targetPath,
        ctx
      )
    }
  }
}
