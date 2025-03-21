// utils/phUtils.ts

// Calculate the effect of adding an element on the pH level
export const calculateNewPh = (currentPh: number, element: { effect: number }): number => {
  // Ensure pH stays within 0-14 range
  return Math.max(0, Math.min(14, currentPh + element.effect))
}

// Get a descriptive status based on pH value
export const getAcidityStatus = (ph: number): string => {
  if (ph < 3) return "extremely acidic"
  if (ph < 5) return "very acidic"
  if (ph < 6.5) return "acidic"
  if (ph < 7.5) return "neutral"
  if (ph < 8.5) return "slightly basic"
  if (ph < 11) return "basic"
  return "very basic"
}

// Get color representation for pH value
export const getPhColor = (ph: number): string => {
  if (ph <= 3) return "#FF0000" // Red for very acidic
  if (ph <= 6) return "#FF9900" // Orange for acidic
  if (ph <= 8) return "#00CC00" // Green for neutral
  if (ph <= 11) return "#0099FF" // Blue for basic
  return "#9900FF" // Purple for very basic
}
