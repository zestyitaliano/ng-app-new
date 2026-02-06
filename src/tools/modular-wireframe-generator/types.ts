export enum SectionType {
  Hero = 'Hero',
  Feature = 'Feature',
  Gallery = 'Gallery',
  Testimonial = 'Testimonial',
  Contact = 'Contact',
  Footer = 'Footer',
  Pricing = 'Pricing'
}

export interface SectionData {
  id: string;
  type: SectionType;
  variation: number; // 1, 2, or 3
}

export interface WireframeProps {
  variation: number;
}