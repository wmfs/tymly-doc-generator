const debug = require('debug')('tymly-doc-generator')
const path = require('path')

const COMPONENT_NAMES = [
  'containers',
  'elements',
  'inputs',
  'actions'
]

const SINGULAR_MAP = {
  containers: 'container',
  elements: 'element',
  inputs: 'input',
  actions: 'action'
}

module.exports = function generatePluginPages (fs, gatherer, utils) {
  const manifest = gatherer.getCardscriptManifest()
  COMPONENT_NAMES.forEach(
    (pluralName) => {
      const singularName = SINGULAR_MAP[pluralName]
      const templatePath = utils.templatePath(`${singularName}.md.ejs`)
      debug(`Using template ${templatePath}`)

      console.log(gatherer)
      manifest[pluralName].forEach(
        (component) => {
          const ctx = utils.getBaseContext()
          const targetPath = path.join(
            utils.referenceRootPath(),
            'cardscript',
            pluralName,
            component.typeSafe + '.md'
          )
          console.log(targetPath)
          ctx[singularName] = component
          fs.copyTpl(
            templatePath,
            targetPath,
            ctx
          )
        }
      )
    }
  )

  /*
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
      */

  //
  //   }
  // )
}
