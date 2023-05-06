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
