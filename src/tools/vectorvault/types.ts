export interface IconData {
  id: string;
  name: string;
  path: string[]; // Array of SVG path strings
  tags: string[];
  viewBox?: string; // Default 0 0 24 24
  defaultStyle?: 'stroke' | 'fill';
}

export interface FilterState {
  search: string;
  style: 'all' | 'stroke' | 'fill';
}

export interface IconCustomization {
  color: string;
  size: number;
  strokeWidth: number;
  style: 'stroke' | 'fill'; // Current render mode
}