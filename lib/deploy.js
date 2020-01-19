const themekit = require('@shopify/themekit')

function deploy (files, base, config, env) {
  return themekit.command('deploy', {
    password: config.password,
    store: config.store,
    env: env,
    themeid: config.theme_id,
    files: files
  }, {
    cwd: base
  })
}

module.exports = deploy
