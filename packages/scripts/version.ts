import chalk from 'chalk'
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import compare from 'semver-compare'

import distComposer from '../../dist/composer.json'
import distPkg from '../../dist/package.json'
import pkg from '../countries/package.json'

const [, , version]: string[] = process.argv

if (!version) {
  console.error('Error: Version is not specified')
  process.exit()
}

if (compare(version, distPkg.version) < 0) {
  console.error(`Error: Version should be bigger than current: v${version} < v${distPkg.version}`)
  process.exit()
}

const saveJsonFile = (filePath: string, data: any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, undefined, 2) + '\n')
  console.log('Saved', chalk.blue(path.relative(process.cwd(), filePath)))
}

console.log(chalk.bold('\nUpdating files:\n'))

saveJsonFile('../../dist/composer.json', {
  ...distComposer,
  version,
})

saveJsonFile('../../dist/package.json', {
  ...distPkg,
  version,
})

saveJsonFile('../countries/package.json', {
  ...pkg,
  version,
})

// Make sure package-lock files are up to date, with actual version
execSync('cd ../.. && npm i')
console.log('Updated', chalk.blue('package-lock.json'), 'files')

console.log(chalk.green('\nDone.'))
