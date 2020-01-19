const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const { extractCritical } = require('./lib/extract-critical')
const inlineCritical = require('./lib/inline-critical')
const replaceAsset = require('./lib/replace-asset')
const deploy = require('./lib/deploy')

const criticalConfigFile = fs.readFileSync('shopify_critical.yml', 'utf8')
const themekitConfigFile = fs.readFileSync('config.yml', 'utf8')

const criticalConfig = yaml.safeLoad(criticalConfigFile)
const themekitConfig = yaml.safeLoad(themekitConfigFile)

const {
  css = '',
  width = 1300,
  height = 900,
  target = '',
  urls = [],
  minify = false,
  base = '',
  env = ''
} = criticalConfig

const penthouseOptions = {
  css,
  width,
  height
}

const stylesheet = path.basename(css)

async function shopifyCritical () {
  const files = [css, target]
  const config = themekitConfig[env]
  const criticalCSS = await extractCritical(urls, penthouseOptions)

  inlineCritical(target, criticalCSS, stylesheet)

  replaceAsset(css, criticalCSS, minify)

  deploy(files, base, config, env)
}

module.exports = shopifyCritical
