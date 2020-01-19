const themekit = require('@shopify/themekit')
const path = require('path')

function deploy (files, base, config, env) {
  const relativeFiles = files.map(file => path.relative(base, file))

  return themekit.command('deploy', {
    password: config.password,
    store: config.store,
    env: env,
    themeid: config.theme_id,
    files: relativeFiles
  }, {
    cwd: base
  })
}

module.exports = deploy
