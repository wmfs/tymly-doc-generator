const debug = require('debug')('tymly-doc-generator')
const path = require('path')
const getMarkdown = require('@wmfs/json-schema-markdown-a-tron')
const _ = require('lodash')

module.exports = function generateStateResourcePages (fs, gatherer, utils) {
  const templatePath = utils.templatePath('state-resource.md.ejs')

  debug(`Using template ${templatePath}`)

  const pluginList = gatherer.getPluginList()

  for (const plugin of pluginList) {
    const stateResources = gatherer.getStateResourceList({ pluginName: plugin.name })

    for (const stateResource of stateResources) {
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
      ctx.hasSchema = Object.prototype.hasOwnProperty.call(ctx.stateResource, 'schema') && _.isObject(ctx.stateResource.schema) && Object.prototype.hasOwnProperty.call(ctx.stateResource.schema, 'properties')
      if (ctx.hasSchema) {
        ctx.schemaMarkdown = getMarkdown(
          ctx.stateResource.schema,
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
