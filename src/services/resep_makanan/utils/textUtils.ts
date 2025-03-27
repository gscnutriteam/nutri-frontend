// Helper to get estimated reading time
export function estimateReadingTime(content: string): number {
  if (!content) return 1; // Default to 1 minute if content is empty
  
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute)); // Ensure at least 1 minute
} 