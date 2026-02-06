import React from 'react';
import { SectionData, SectionType } from '../types';
import { HeroWireframe } from './wireframes/HeroWireframe';
import { FeatureWireframe } from './wireframes/FeatureWireframe';
import { GalleryWireframe } from './wireframes/GalleryWireframe';
import { TestimonialWireframe } from './wireframes/TestimonialWireframe';
import { ContactWireframe } from './wireframes/ContactWireframe';
import { FooterWireframe } from './wireframes/FooterWireframe';
import { PricingWireframe } from './wireframes/PricingWireframe';

interface Props {
  data: SectionData;
}

export const WireframeRenderer: React.FC<Props> = ({ data }) => {
  const { type, variation } = data;

  switch (type) {
    case SectionType.Hero:
      return <HeroWireframe variation={variation} />;
    case SectionType.Feature:
      return <FeatureWireframe variation={variation} />;
    case SectionType.Gallery:
      return <GalleryWireframe variation={variation} />;
    case SectionType.Testimonial:
      return <TestimonialWireframe variation={variation} />;
    case SectionType.Contact:
      return <ContactWireframe variation={variation} />;
    case SectionType.Footer:
      return <FooterWireframe variation={variation} />;
    case SectionType.Pricing:
      return <PricingWireframe variation={variation} />;
    default:
      return <div className="p-4 text-red-500">Unknown Section Type</div>;
  }
};