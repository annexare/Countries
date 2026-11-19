import { buildBundles } from 'scripts/tasks/buildBundles.ts'
import { copyFiles } from 'scripts/tasks/copyFiles.ts'
import { generateCsv } from 'scripts/tasks/generateCsv.ts'
import { generateSql } from 'scripts/tasks/generateSql.ts'
import { generateTypings } from 'scripts/tasks/generateTypings.ts'
import { minifyJsonData } from 'scripts/tasks/minifyJsonData.ts'

// Data
minifyJsonData()

// Additional formats
generateCsv()
generateSql()

// Meta
generateTypings()

// Bundles
await buildBundles()

// Necessary files for publishing
copyFiles()
