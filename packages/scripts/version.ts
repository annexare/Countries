import chalk from 'chalk'
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import compare from 'semver-compare'

import distComposer from '../../composer.json' with { type: 'json' }
import distPkg from '../../dist/package.json' with { type: 'json' }
import rootPkg from '../../package.json' with { type: 'json' }
import pkg from '../countries/package.json' with { type: 'json' }

const [, , version]: string[] = process.argv

if (!version) {
  console.error('Error: Version is not specified')
  process.exit()
}

if (compare(version, distPkg.version) < 0) {
  console.error(`Error: Version should be bigger than current: v${version} < v${distPkg.version}`)
  process.exit()
}

const saveJsonFile = (filePath: string, data: unknown) => {
  fs.writeFileSync(filePath, JSON.stringify(data, undefined, 2) + '\n')
  console.log('Saved', chalk.blue(path.relative(process.cwd(), filePath)))
}

console.log(chalk.bold('\nUpdating files:\n'))

saveJsonFile('../../composer.json', {
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

saveJsonFile('../../package.json', {
  ...rootPkg,
  version,
})

// Make sure package-lock files are up to date, with actual version
execSync('cd ../.. && bun i')
console.log('Updated', chalk.blue('lock'), 'file')

// Normalize formatting: JSON.stringify above differs from Biome's (e.g. array wrapping),
// which would otherwise fail `bun run lint`.
execSync('cd ../.. && bun run format')
console.log('Formatted with', chalk.blue('Biome'))

console.log(chalk.green('\nDone.'))
