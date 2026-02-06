
export const COLORS = {
  accent: '#1982c4',
  line: '#ff595e',
  fill: '#efefef',
  highlight: '#ffca3a',
  white: '#ffffff',
  textPlaceholder: '#b0b0b0'
};

export const SECTION_TYPES = [
  { label: 'Hero Section', value: 'Hero' },
  { label: 'Feature/Info', value: 'Feature' },
  { label: 'Photo/Gallery', value: 'Gallery' },
  { label: 'Pricing Table', value: 'Pricing' },
  { label: 'Testimonial', value: 'Testimonial' },
  { label: 'Contact', value: 'Contact' },
  { label: 'Footer', value: 'Footer' },
] as const;

export const SECTION_STYLE_MAP: Record<string, string> = {
  Hero: '#1982c4',       // Blue
  Feature: '#2a9d8f',    // Teal
  Gallery: '#9b5de5',    // Purple
  Testimonial: '#ffca3a',// Yellow
  Contact: '#ff595e',    // Red
  Footer: '#343a40',     // Dark Gray
  Pricing: '#4361ee'     // Indigo
};