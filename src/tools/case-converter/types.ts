export enum CaseType {
  Sentence = 'Sentence case',
  Lower = 'lowercase',
  Upper = 'UPPERCASE',
  Title = 'Title Case',
  Capitalize = 'Capitalize Each Word',
  Alternating = 'aLtErNaTiNg cAsE',
  Inverse = 'InVeRsE CaSe',
  Camel = 'camelCase',
  Pascal = 'PascalCase',
  Snake = 'snake_case',
  Kebab = 'kebab-case',
  Constant = 'CONSTANT_CASE',
}

export const SMALL_WORDS = new Set([
  'a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'from', 'if', 'in', 
  'into', 'nor', 'of', 'on', 'or', 'over', 'so', 'the', 'to', 'up', 'via', 
  'with', 'yet'
]);
