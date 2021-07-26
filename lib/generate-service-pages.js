const debug = require('debug')('tymly-doc-generator')
const path = require('path')
const getMarkdown = require('@wmfs/json-schema-markdown-a-tron')
const _ = require('lodash')

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
      ctx.hasSchema = Object.prototype.hasOwnProperty.call(ctx.service, 'schema') && _.isObject(ctx.service.schema) && Object.prototype.hasOwnProperty.call(ctx.service.schema, 'properties') && Object.keys(ctx.service.schema.properties).length > 0
      if (ctx.hasSchema) {
        ctx.schemaMarkdown = getMarkdown(
          ctx.service.schema,
          { baseHeaderIndentDepth: 3 }
        ).markdown
      }
      fs.copyTpl(
        templatePath,
        targetPath,
        ctx
      )
    }
  }
}
