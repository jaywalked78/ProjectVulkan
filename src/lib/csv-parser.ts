import Papa from 'papaparse'

export interface ParseResult {
  success: boolean
  data?: Array<{ question: string; answer: string }>
  error?: string
}

export async function parseCSVFile(file: File): Promise<ParseResult> {
  return new Promise((resolve) => {
    // Validate file type
    if (!file.name.endsWith('.csv')) {
      resolve({
        success: false,
        error: 'Please upload a CSV file',
      })
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      resolve({
        success: false,
        error: 'File size must be less than 5MB',
      })
      return
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().toLowerCase(),
      complete: (results) => {
        // Validate structure
        if (!results.data || results.data.length === 0) {
          resolve({
            success: false,
            error: 'CSV file is empty',
          })
          return
        }

        // Map data to expected format
        const cards = (results.data as Record<string, unknown>[]).map((row) => {
          // Try different column name variations
          const question = String(row.question || row.q || row['question'] || '')
          const answer = String(row.answer || row.a || row['answer'] || '')

          return {
            question: question.trim(),
            answer: answer.trim(),
          }
        }).filter(card => card.question && card.answer)

        if (cards.length === 0) {
          resolve({
            success: false,
            error: 'No valid question/answer pairs found. Ensure CSV has "Question" and "Answer" columns.',
          })
          return
        }

        resolve({
          success: true,
          data: cards,
        })
      },
      error: (error) => {
        resolve({
          success: false,
          error: `Failed to parse CSV: ${error.message}`,
        })
      },
    })
  })
}