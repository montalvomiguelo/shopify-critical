const fs = require('fs')
const yaml = require('js-yaml')
const { extractCritical } = require('./lib/extract-critical')

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

async function shopifyCritical () {
  const criticalCSS = await extractCritical(urls, penthouseOptions)
}

module.exports = shopifyCritical
