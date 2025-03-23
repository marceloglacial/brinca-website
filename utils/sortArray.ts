type SortOrder = 'asc' | 'desc'

function getDeepValue<T>(obj: T, path: string): any {
  return path.split('.').reduce((acc: any, part) => acc && acc[part], obj)
}

export function sortArray<T>(arr: T[], path: string, order: SortOrder = 'desc'): T[] {
  return arr.sort((a, b) => {
    const aValue = getDeepValue(a, path)
    const bValue = getDeepValue(b, path)
    if (aValue < bValue) return order === 'asc' ? -1 : 1
    if (aValue > bValue) return order === 'asc' ? 1 : -1
    return 0
  })
}
