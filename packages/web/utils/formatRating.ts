/**
 * Format a rating to have at most one decimal place
 * @param rating The rating to format (0-100 scale)
 * @returns Formatted rating as a string with at most one decimal place
 */
export const formatRating = (rating: number): string => {
  // Arrondir à une décimale avant de formater
  const rounded = Math.round(rating * 10) / 10;
  return Number.isInteger(rounded) 
    ? rounded.toString() 
    : rounded.toFixed(1);
};
