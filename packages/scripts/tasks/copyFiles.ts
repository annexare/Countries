import chalk from 'chalk'

import { copyFileToDist } from 'scripts/utils.ts'

export const copyFiles = (): void => {
  console.log(chalk.bold('\nCopying files to DIST:\n'))

  copyFileToDist('../../LICENSE')
  copyFileToDist('../../README.md')
}
