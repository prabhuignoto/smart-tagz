import * as XLSX from 'xlsx'
import { resolve } from 'path'

interface BugTrackerEntry {
  'Issue #': string
  Title: string
  Status: string
  Priority: string
  Type: string
  'Root Cause': string
  'Fix Location': string
  'Test Coverage': string
  Notes: string
}

const bugTrackerData: BugTrackerEntry[] = [
  // CRITICAL BUGS
  {
    'Issue #': '#54',
    Title: 'Set Object Serialization Bug with allow-duplicates',
    Status: 'Open - In Progress',
    Priority: 'HIGH',
    Type: 'Bug',
    'Root Cause':
      'Internal Set object exposed in output instead of Array when using allow-duplicates=false with paste',
    'Fix Location': 'src/components/HandlePaste.ts:54',
    'Test Coverage': 'Needs regression test',
    Notes: 'Duplicate of #27. Data corruption issue - outputs { "Set(3)": [...] } instead of array',
  },
  {
    'Issue #': '#27',
    Title: 'Bug with allow-duplicates=false producing malformed Set',
    Status: 'Open - Duplicate of #54',
    Priority: 'HIGH',
    Type: 'Bug',
    'Root Cause': 'Same as #54 - Set serialization issue',
    'Fix Location': 'src/components/HandlePaste.ts',
    'Test Coverage': 'Needs regression test',
    Notes: 'Long-standing issue (2+ years). Will be fixed together with #54',
  },
  {
    'Issue #': '#33',
    Title: 'tagsCreated counter increments on empty Enter',
    Status: 'Open - In Progress',
    Priority: 'MEDIUM',
    Type: 'Bug',
    'Root Cause': 'Missing validation for empty/whitespace input before incrementing counter',
    'Fix Location': 'src/components/MainSetup.ts:233-280 (handleAddTag)',
    'Test Coverage': 'Needs test for empty input',
    Notes: 'UX issue - counter gets out of sync with actual tags created',
  },
  {
    'Issue #': '#20',
    Title: 'Enter key replaces previous tag instead of appending',
    Status: 'Open - In Progress',
    Priority: 'MEDIUM',
    Type: 'Bug',
    'Root Cause': 'Tag addition logic replaces instead of appends; null focus error',
    'Fix Location': 'src/components/MainSetup.ts:139-143 (focus handling)',
    'Test Coverage': 'Needs integration test',
    Notes: 'Data loss issue + error: "Cannot read properties of null (reading \'focus\')"',
  },

  // FEATURE REQUESTS
  {
    'Issue #': '#53',
    Title: 'Add Reset/Remove All Tags API',
    Status: 'Open - In Progress',
    Priority: 'MEDIUM',
    Type: 'Feature Request',
    'Root Cause': 'No programmatic way to clear all tags at once',
    'Fix Location': 'src/components/MainSetup.ts (add clearAllTags method)',
    'Test Coverage': 'Will add tests',
    Notes: 'Workaround exists (quickDelete + Ctrl+A + Delete) but not developer-friendly',
  },
  {
    'Issue #': '#47',
    Title: 'Nuxt 3 Compatibility',
    Status: 'Open - In Progress',
    Priority: 'MEDIUM',
    Type: 'Feature Request',
    'Root Cause': 'Component not working with Nuxt 3 SSR',
    'Fix Location': 'Build configuration + documentation',
    'Test Coverage': 'Will add Nuxt 3 example',
    Notes: 'Framework compatibility improvement. Needs research on SSR requirements',
  },

  // RESOLVED ISSUES (To be closed)
  {
    'Issue #': '#10',
    Title: 'Add change event',
    Status: 'Resolved - To be closed',
    Priority: 'LOW',
    Type: 'Feature Request (Resolved)',
    'Root Cause': 'N/A - Already implemented',
    'Fix Location': 'src/components/MainSetup.ts:18, 30 (onChanged prop exists)',
    'Test Coverage': 'Already tested',
    Notes: 'Feature already implemented. Need to close issue and update documentation',
  },
  {
    'Issue #': '#7',
    Title: 'TypeScript Support',
    Status: 'Resolved - To be closed',
    Priority: 'LOW',
    Type: 'Feature Request (Resolved)',
    'Root Cause': 'N/A - Already implemented',
    'Fix Location': 'Entire project is TypeScript',
    'Test Coverage': 'Full TypeScript coverage',
    Notes: 'Project fully written in TypeScript. Need to close issue and update docs',
  },

  // DOCUMENTATION/OTHER
  {
    'Issue #': '#16',
    Title: 'Is :source prop reactive?',
    Status: 'Open - Documentation',
    Priority: 'LOW',
    Type: 'Documentation',
    'Root Cause': 'Question about reactivity behavior',
    'Fix Location': 'N/A - Documentation update needed',
    'Test Coverage': 'N/A',
    Notes: 'Need to document source prop reactivity behavior in README',
  },
  {
    'Issue #': '#29',
    Title: 'Depfu Error',
    Status: 'Open - DevOps',
    Priority: 'LOW',
    Type: 'DevOps',
    'Root Cause': 'Dependency management infrastructure issue',
    'Fix Location': 'N/A - External service',
    'Test Coverage': 'N/A',
    Notes: 'Infrastructure issue with Depfu service. Low impact on users',
  },
]

// Create summary statistics
const summary = {
  'Total Issues': bugTrackerData.length,
  'Critical Bugs': bugTrackerData.filter((i) => i.Priority === 'HIGH').length,
  'Medium Priority': bugTrackerData.filter((i) => i.Priority === 'MEDIUM').length,
  'Low Priority': bugTrackerData.filter((i) => i.Priority === 'LOW').length,
  'Bugs to Fix': bugTrackerData.filter((i) => i.Type === 'Bug').length,
  'Features to Implement': bugTrackerData.filter((i) => i.Type === 'Feature Request').length,
  'Issues to Close': bugTrackerData.filter((i) => i.Status.includes('Resolved')).length,
  'Documentation Updates': bugTrackerData.filter((i) => i.Type === 'Documentation').length,
}

// Create workbook
const wb = XLSX.utils.book_new()

// Add summary sheet
const summaryData = Object.entries(summary).map(([key, value]) => ({
  Metric: key,
  Count: value,
}))
const summarySheet = XLSX.utils.json_to_sheet(summaryData)
XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary')

// Add main bug tracker sheet
const mainSheet = XLSX.utils.json_to_sheet(bugTrackerData)

// Set column widths
mainSheet['!cols'] = [
  { wch: 10 }, // Issue #
  { wch: 50 }, // Title
  { wch: 25 }, // Status
  { wch: 10 }, // Priority
  { wch: 25 }, // Type
  { wch: 60 }, // Root Cause
  { wch: 45 }, // Fix Location
  { wch: 25 }, // Test Coverage
  { wch: 70 }, // Notes
]

XLSX.utils.book_append_sheet(wb, mainSheet, 'Bug Tracker')

// Add priority breakdown sheet
const priorityBreakdown = [
  {
    Priority: 'HIGH',
    Count: bugTrackerData.filter((i) => i.Priority === 'HIGH').length,
    Issues: bugTrackerData
      .filter((i) => i.Priority === 'HIGH')
      .map((i) => i['Issue #'])
      .join(', '),
  },
  {
    Priority: 'MEDIUM',
    Count: bugTrackerData.filter((i) => i.Priority === 'MEDIUM').length,
    Issues: bugTrackerData
      .filter((i) => i.Priority === 'MEDIUM')
      .map((i) => i['Issue #'])
      .join(', '),
  },
  {
    Priority: 'LOW',
    Count: bugTrackerData.filter((i) => i.Priority === 'LOW').length,
    Issues: bugTrackerData
      .filter((i) => i.Priority === 'LOW')
      .map((i) => i['Issue #'])
      .join(', '),
  },
]
const prioritySheet = XLSX.utils.json_to_sheet(priorityBreakdown)
XLSX.utils.book_append_sheet(wb, prioritySheet, 'Priority Breakdown')

// Write file
const outputPath = resolve(process.cwd(), 'bug-tracker.xlsx')
XLSX.writeFile(wb, outputPath)

console.log(`✅ Bug tracker created successfully at: ${outputPath}`)
console.log(`\n📊 Summary:`)
console.log(`   Total Issues: ${summary['Total Issues']}`)
console.log(`   Critical Bugs: ${summary['Critical Bugs']}`)
console.log(`   Medium Priority: ${summary['Medium Priority']}`)
console.log(`   Features to Implement: ${summary['Features to Implement']}`)
console.log(`   Issues to Close: ${summary['Issues to Close']}`)
