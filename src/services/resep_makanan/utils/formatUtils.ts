// Helper function to convert label to readable format
export function formatLabel(label: string): string {
  switch(label?.toLowerCase()) {
    case 'breakfast':
      return 'Makan Pagi';
    case 'lunch':
      return 'Makan Siang';
    case 'dinner':
      return 'Makan Malam';
    default:
      return label || '';
  }
}

// Helper function to convert day enum to Indonesian
export function formatDay(day: string): string {
  switch(day?.toLowerCase()) {
    case 'sunday':
      return 'Minggu';
    case 'monday':
      return 'Senin';
    case 'tuesday':
      return 'Selasa';
    case 'wednesday':
      return 'Rabu';
    case 'thursday':
      return 'Kamis';
    case 'friday':
      return 'Jumat';
    case 'saturday':
      return 'Sabtu';
    default:
      return day || '';
  }
} 