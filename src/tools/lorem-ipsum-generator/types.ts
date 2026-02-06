export enum GeneratorUnit {
  PARAGRAPHS = 'paragraphs',
  WORDS = 'words',
  BYTES = 'bytes',
  LISTS = 'lists',
}

export interface GeneratorOptions {
  amount: number;
  unit: GeneratorUnit;
  startWithLorem: boolean;
  asHtml: boolean; // Specifically for Lists mode
}
