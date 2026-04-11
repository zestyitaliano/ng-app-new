import { IconData } from '../types';

const STORAGE_KEY = 'vectorvault_icons_v2';
const MAP_PIN_PATH =
  'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z';

// Pre-populated high quality icons (Filled/Solid style)
const DEFAULT_ICONS: IconData[] = [
  {
    id: '1',
    name: 'Home',
    tags: ['house', 'building', 'interface', 'core'],
    path: ['M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'],
    defaultStyle: 'fill'
  },
  {
    id: '2',
    name: 'Settings',
    tags: ['gear', 'cog', 'preferences', 'options', 'core'],
    path: ['M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.48.48 0 0 0-.59.22L2.04 8.91a.49.49 0 0 0 .12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.58 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z'],
    defaultStyle: 'fill'
  },
  {
    id: '3',
    name: 'User',
    tags: ['person', 'account', 'profile', 'avatar'],
    path: ['M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'],
    defaultStyle: 'fill'
  },
  {
    id: '4',
    name: 'Search',
    tags: ['find', 'magnifier', 'zoom', 'glass'],
    path: ['M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'],
    defaultStyle: 'fill'
  },
  {
    id: '5',
    name: 'Heart',
    tags: ['love', 'like', 'favorite', 'social'],
    path: ['M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'],
    defaultStyle: 'fill'
  },
  {
    id: '6',
    name: 'Download',
    tags: ['arrow', 'save', 'import'],
    path: ['M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z'],
    defaultStyle: 'fill'
  },
  {
    id: '7',
    name: 'Image',
    tags: ['picture', 'photo', 'media'],
    path: ['M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'],
    defaultStyle: 'fill'
  },
  {
    id: '8',
    name: 'Trash',
    tags: ['delete', 'remove', 'bin', 'garbage'],
    path: ['M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z'],
    defaultStyle: 'fill'
  },
  {
    id: '9',
    name: 'Camera',
    tags: ['photo', 'video', 'media'],
    path: ['M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z'],
    defaultStyle: 'fill'
  },
  {
    id: '10',
    name: 'Map Pin',
    tags: ['location', 'gps', 'marker', 'place'],
    path: [MAP_PIN_PATH],
    defaultStyle: 'fill'
  },
  {
    id: '11',
    name: 'Zap',
    tags: ['electricity', 'lightning', 'energy', 'fast'],
    path: ['M11.57 20L21.5 9.17h-8.08L14.5 2h-9l-1 10.83h8.08z'],
    defaultStyle: 'fill'
  },
  {
    id: '12',
    name: 'Star',
    tags: ['favorite', 'rating', 'like'],
    path: ['M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'],
    defaultStyle: 'fill'
  }
];

const sanitizeIcons = (icons: IconData[]): IconData[] =>
  icons.map((icon) => {
    if (icon.id !== '10' && icon.name !== 'Map Pin') {
      return icon;
    }

    return {
      ...icon,
      path: [MAP_PIN_PATH],
    };
  });

class IconService {
  private icons: IconData[];

  constructor() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      this.icons = sanitizeIcons(JSON.parse(stored));
      this.save();
    } else {
      this.icons = sanitizeIcons(DEFAULT_ICONS);
      this.save();
    }
  }

  getAllIcons(): IconData[] {
    return this.icons;
  }

  addIcon(icon: IconData) {
    this.icons = [icon, ...this.icons]; // Add to top
    this.save();
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.icons));
  }
}

export const iconService = new IconService();
