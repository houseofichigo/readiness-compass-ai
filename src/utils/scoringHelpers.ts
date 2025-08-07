// Utility functions for scoring system

/** Check if a count matches a range expression like "2-3", ">=10", "1" */
export function matchesCountRange(count: number, range: string): boolean {
  // Handle exact match
  if (!isNaN(Number(range))) {
    return count === Number(range);
  }
  
  // Handle range like "2-3"
  const rangeMatch = range.match(/^(\d+)-(\d+)$/);
  if (rangeMatch) {
    const [, min, max] = rangeMatch;
    return count >= Number(min) && count <= Number(max);
  }
  
  // Handle ">=" expressions
  const gteMatch = range.match(/^>=(\d+)$/);
  if (gteMatch) {
    return count >= Number(gteMatch[1]);
  }
  
  // Handle ">" expressions
  const gtMatch = range.match(/^>(\d+)$/);
  if (gtMatch) {
    return count > Number(gtMatch[1]);
  }
  
  // Handle "<=" expressions
  const lteMatch = range.match(/^<=(\d+)$/);
  if (lteMatch) {
    return count <= Number(lteMatch[1]);
  }
  
  // Handle "<" expressions
  const ltMatch = range.match(/^<(\d+)$/);
  if (ltMatch) {
    return count < Number(ltMatch[1]);
  }
  
  return false;
}

/** Enhanced matrix question scoring */
export function scoreMatrixQuestion(
  rows: (string | { value: string; score?: number })[],
  columns: (string | { value: string; score?: number })[],
  answer: Record<string, string>
): number {
  if (!answer || Object.keys(answer).length === 0) {
    return 50; // Default for empty matrix
  }
  
  let totalScore = 0;
  let validResponses = 0;
  
  Object.entries(answer).forEach(([rowKey, colValue]) => {
    // Find column score
    const column = columns.find(col => 
      (typeof col === 'string' ? col : col.value) === colValue
    );
    
    if (column && typeof column === 'object' && column.score !== undefined) {
      totalScore += column.score;
      validResponses++;
    } else {
      // Fallback scoring based on column position
      const colIndex = columns.findIndex(col => 
        (typeof col === 'string' ? col : col.value) === colValue
      );
      if (colIndex >= 0) {
        // Assume linear scoring from 0 to 100 across columns
        totalScore += (colIndex / (columns.length - 1)) * 100;
        validResponses++;
      }
    }
  });
  
  return validResponses > 0 ? totalScore / validResponses : 50;
}

/** Enhanced ranking question scoring with proper weight handling */
export function scoreRankingQuestion(
  selectedItems: string[],
  weights: number[],
  allOptions: string[]
): number {
  if (!selectedItems.length || !weights.length) {
    return 50;
  }
  
  // Calculate score based on weights for selected positions
  const usedWeights = weights.slice(0, selectedItems.length);
  const totalUsedWeight = usedWeights.reduce((sum, w) => sum + w, 0);
  const maxPossibleWeight = weights.reduce((sum, w) => sum + w, 0);
  
  return maxPossibleWeight > 0 ? (totalUsedWeight / maxPossibleWeight) * 100 : 0;
}