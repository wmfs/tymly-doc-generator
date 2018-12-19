const stopText = require('./stop-text')
const Gatherer = require('C:\\development\\tymly-gatherer\\lib')
const gatherer = new Gatherer(
  {
    sourceDir: process.env.PLUGINS_PATH,
    config: {
      plugins: true,
      stateResources: true,
      services: true
    }
  }
)

module.exports = async function gather () {
  const plugins = await gatherer.listPluginSummary()
  return {
    plugins,
    stopText
  }
}
