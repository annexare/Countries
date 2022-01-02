import { generateCsv } from './tasks/generateCsv'
import { generateSql } from './tasks/generateSql'
import { generateTypings } from './tasks/generateTypings'
import { minifyJsonData } from './tasks/minifyJsonData'

// Data
minifyJsonData()

// Additional formats
generateCsv()
generateSql()

// Meta
generateTypings()
