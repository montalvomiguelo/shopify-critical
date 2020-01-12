const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const { extractCritical } = require('./lib/extract-critical')
const inlineCritical = require('./lib/inline-critical')

const criticalConfigFile = fs.readFileSync('shopify_critical.yml', 'utf8')
const themekitConfigFile = fs.readFileSync('config.yml', 'utf8')

const criticalConfig = yaml.safeLoad(criticalConfigFile)
const themekitConfig = yaml.safeLoad(themekitConfigFile)

const {
  css = '',
  width = 1300,
  height = 900,
  target = '',
  urls = []
} = criticalConfig

const penthouseOptions = {
  css,
  width,
  height
}

const stylesheet = path.basename(css)

async function shopifyCritical () {
  const criticalCSS = await extractCritical(urls, penthouseOptions)

  inlineCritical(target, criticalCSS, stylesheet)
}

module.exports = shopifyCritical
