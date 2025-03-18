import { ScenicElement } from "@/components/ScenicElements";

// Get color based on pH value
export function getPhColor(ph: number): string {
  if (ph < 2) return '#FF0000'; // Bright red (very acidic)
  if (ph < 4) return '#FF6B00'; // Orange-red
  if (ph < 6) return '#FFA500'; // Orange
  if (ph < 7) return '#FFFF00'; // Yellow
  if (ph === 7) return '#00FF00'; // Green (neutral)
  if (ph < 9) return '#00FFFF'; // Cyan
  if (ph < 11) return '#0080FF'; // Light blue
  if (ph < 13) return '#0000FF'; // Blue
  return '#8000FF'; // Purple (very basic)
}

// Get acidity status text based on pH value
export function getAcidityStatus(ph: number): string {
  if (ph < 3) return 'Strongly Acidic';
  if (ph < 7) return 'Acidic';
  if (ph === 7) return 'Neutral';
  if (ph < 11) return 'Basic';
  return 'Strongly Basic';
}

export function calculateNewPh(basePh: number, element: ScenicElement): number {
  let newPh = basePh;

  switch (element.type) {
    case 'limestone':
      newPh = Math.min(14, basePh + element.effect);
      break;
    case 'algae':
      newPh = Math.max(7, basePh - element.effect);
      break;
    case 'pollution':
      newPh = Math.max(0, basePh - element.effect);
      break;
    case 'plant':
      newPh = Math.min(8, basePh + element.effect);
      break;
    case 'oil':
      newPh = Math.max(0, basePh - element.effect);
      break;
    // Add default case to handle unexpected types
    default:
      newPh = basePh;
      break;
  }
  return newPh;
}
