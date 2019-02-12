/* eslint unicorn/no-process-exit: off */
const prepare = require('./prepare')
const {writeData, extractDataFromSource} = require('./util')

async function buildRegions() {
  const rows = await extractDataFromSource('reg2018-txt.zip')
  const regions = rows.map(prepare.prepareRegion).filter(Boolean)
  await writeData('regions', regions)
}

async function buildDepartements() {
  const rows = await extractDataFromSource('depts2018-txt.zip')
  const data = rows.map(prepare.prepareDepartement).filter(Boolean)
  await writeData('departements', data)
}

async function buildArrondissements() {
  const rows = await extractDataFromSource('arrond2018-txt.zip')
  const data = rows.map(prepare.prepareRegion).filter(Boolean)
  await writeData('arrondissements', data)
}

async function buildCommunes() {
  const rows = await extractDataFromSource('France2018-txt.zip')
  const data = rows.map(prepare.prepareRegion).filter(Boolean)
  await writeData('communes', data)
}

async function main() {
  await buildRegions()
  await buildDepartements()
  await buildArrondissements()
  await buildCommunes()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
