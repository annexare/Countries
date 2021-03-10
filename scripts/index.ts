import { generateCsv } from './tasks/generateCsv'
import { generateTypings } from './tasks/generateTypings'
import { minifyJsonData } from './tasks/minifyJsonData'

// Data
minifyJsonData()

// Additional formats
generateCsv()

// Meta
generateTypings()
