const penthouse = require('penthouse')
const maxPenthouseJobs = 5

async function startPenthouseJob (urls, penthouseOptions, output = '') {
  const url = urls.shift()

  if (!url) {
    return Promise.resolve(output)
  }

  const criticalCSS = await penthouse({
    url,
    ...penthouseOptions
  })

  return await startPenthouseJob(urls, penthouseOptions, output + criticalCSS)
}

async function startJobs (urls, penthouseOptions) {
  const parallel = Math.min(urls.length, maxPenthouseJobs)

  const jobs = [...Array(parallel)].map(() => (
    startPenthouseJob(urls, penthouseOptions)
  ))

  return await Promise.all(jobs)
}

async function extractCritical (urls, penthouseOptions) {
  const output = await startJobs(urls, penthouseOptions)

  const criticalCSS = output.reduce((critical, css) => critical + css, '')

  return criticalCSS
}

module.exports = {
  extractCritical,
  startJobs
}
