import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import compare from 'semver-compare'

import { execSync } from 'child_process'

import bower from '../bower.json'
import composer from '../composer.json'
import pkg from '../package.json'

const [, , version]: string[] = process.argv

if (!version) {
  console.error('Error: Version is not specified')
  process.exit()
}

if (compare(version, pkg.version) < 1) {
  console.error(`Error: Version should be bigger than current: v${version} < v${pkg.version}`)
  process.exit()
}

const saveJsonFile = (filePath: string, data: any) => {
  const fullPath = path.resolve(__dirname, filePath)
  fs.writeFileSync(fullPath, JSON.stringify(data, undefined, 2) + '\n')
  console.log('Saved', chalk.blue(path.relative(process.cwd(), fullPath)))
}

console.log(chalk.bold('\nUpdating files:\n'))

saveJsonFile('../bower.json', {
  ...bower,
  version,
})

saveJsonFile('../composer.json', {
  ...composer,
  version,
})

saveJsonFile('../package.json', {
  ...pkg,
  version,
})

execSync('npm i')
console.log('Updated', chalk.blue('package-lock.json'))

console.log(chalk.green('\nDone.'))
