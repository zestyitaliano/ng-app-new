import { GeneratorUnit } from '../types';

const DICTIONARY = [
  "ad", "adipiscing", "agilem", "aliqua", "aliquip", "amet", "anim", "aute", "barbarus", "cillum", 
  "commodo", "consectetur", "consequat", "culpa", "cupidatat", "deserunt", "do", "dolor", "dolore", 
  "ducimus", "duis", "ea", "eiusmod", "elit", "enim", "erat", "esse", "est", "et", "eu", "ex", 
  "excepteur", "exercitation", "fabulas", "facilis", "fama", "fatua", "fermentum", "fidelis", "flumen", 
  "fugiat", "gloria", "gravis", "gustus", "habitus", "hac", "habitasse", "hic", "id", "ignis", 
  "imperdiet", "impetus", "in", "incididunt", "invenire", "ipsa", "ipsum", "irure", "iudico", "ius", 
  "laboris", "laborum", "laoreet", "lectus", "leo", "liber", "ligula", "litora", "lorem", "luctus", 
  "magna", "mauris", "maximus", "memor", "metus", "minim", "mollis", "mollit", "morbi", "mos", 
  "motus", "nam", "natus", "nec", "neque", "nisi", "non", "nostrud", "novus", "nulla", "numquam", 
  "nunc", "occaecat", "odio", "officia", "omnis", "oportere", "optio", "oratio", "orci", "ornare", 
  "paria", "pariatur", "parturient", "pax", "pellentesque", "per", "perferendis", "perspiciatis", 
  "pharetra", "placerat", "platea", "porta", "porttitor", "posuere", "potenti", "praesent", "pretium", 
  "proident", "proin", "pulvinar", "purus", "quaerat", "quam", "quis", "quisque", "ratio", "reiciendis", 
  "relinquo", "reprehenderit", "rhoncus", "ridiculus", "risus", "rutrum", "sagittis", "sapien", 
  "scelerisque", "sed", "semper", "sensus", "sequi", "similique", "sint", "sit", "sociis", "sociosqu", 
  "sodales", "sollicitudin", "sonitus", "sunt", "suscipit", "suspendisse", "taciti", "tellus", 
  "tempor", "tempus", "tergum", "terminatio", "terra", "tortor", "totam", "tristique", "turpis", 
  "ullamco", "ullamcorper", "ultrices", "ultricies", "unde", "urna", "ut", "vel", "velit", "veniam", 
  "ventosus", "veritatis", "vestibulum", "vetus", "vicis", "victor", "videlicet", "video", "virtus", 
  "vitae", "viverra", "voluptate", "voluptatem", "volutpat", "vulputate", "vultus", "zelus"
];

const STANDARD_START = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

// Helper to pick random item
const randomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Helper to capitalize first letter
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// Generate a random sentence
const generateSentence = (minWords = 4, maxWords = 15): string => {
  const length = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
  const words: string[] = [];
  
  for (let i = 0; i < length; i++) {
    words.push(randomItem(DICTIONARY));
  }
  
  // Add occasional comma
  if (length > 6 && Math.random() > 0.7) {
    const commaIndex = Math.floor(Math.random() * (length - 3)) + 1;
    words[commaIndex] += ",";
  }

  let sentence = words.join(" ");
  sentence = capitalize(sentence);
  
  // Random punctuation
  const rand = Math.random();
  if (rand > 0.95) sentence += "?";
  else if (rand > 0.9) sentence += "!";
  else sentence += ".";
  
  return sentence;
};

// Generate a paragraph
const generateParagraph = (minSentences = 3, maxSentences = 8): string => {
  const length = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences;
  const sentences: string[] = [];
  for (let i = 0; i < length; i++) {
    sentences.push(generateSentence());
  }
  return sentences.join(" ");
};

export const generateLoremIpsum = (
  amount: number,
  unit: GeneratorUnit,
  startWithLorem: boolean,
  asHtml: boolean = false
): string => {
  if (amount <= 0) return "";

  let result = "";

  switch (unit) {
    case GeneratorUnit.PARAGRAPHS: {
      const paragraphs: string[] = [];
      for (let i = 0; i < amount; i++) {
        let p = generateParagraph();
        if (i === 0 && startWithLorem) {
           // Ensure it doesn't double repeat if the random text happened to start with lorem (unlikely but safe)
           if (!p.toLowerCase().startsWith("lorem")) {
             p = `${STANDARD_START}. ${p}`;
           }
        }
        paragraphs.push(asHtml ? `<p>${p}</p>` : p);
      }
      result = paragraphs.join(asHtml ? "\n" : "\n\n");
      break;
    }

    case GeneratorUnit.WORDS: {
      const words: string[] = [];
      // If startWithLorem, seed the array
      if (startWithLorem) {
        const startWords = STANDARD_START.replace(/[^\w\s]/g, "").split(" ");
        words.push(...startWords);
      }

      while (words.length < amount) {
        words.push(randomItem(DICTIONARY));
      }

      // Trim if startWithLorem made it too long (though we usually just fill up)
      const finalWords = words.slice(0, amount);
      
      // Formatting to look like natural text (capitalization and punctuation)
      // This is a "Words" mode, but pure list of words is ugly. We usually simulate prose.
      // However, usually "Word count" generators just output a stream of text.
      // Let's make it look somewhat like sentences for readability, but strictly control word count.
      result = finalWords.join(" ");
      result = capitalize(result);
      if (!result.endsWith('.')) result += ".";
      break;
    }

    case GeneratorUnit.BYTES: {
        // Generate enough text then slice
        // Estimation: avg word is 5-6 chars + space. 
        const estimatedWords = Math.ceil(amount / 5) + 20; 
        let rawText = "";
        
        // Start with standard if requested
        if (startWithLorem) {
            rawText += STANDARD_START + ". ";
        }

        while (new TextEncoder().encode(rawText).length < amount) {
            rawText += generateSentence() + " ";
        }

        // Trim to bytes
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        
        let encoded = encoder.encode(rawText);
        if (encoded.length > amount) {
            encoded = encoded.slice(0, amount);
        }
        result = decoder.decode(encoded);
        // Handle potential broken utf-8 character at end by ignoring replacement char if needed, 
        // but TextDecoder typically handles it. 
        break;
    }

    case GeneratorUnit.LISTS: {
      const items: string[] = [];
      for (let i = 0; i < amount; i++) {
        let text = generateSentence(6, 12); // Shorter sentences for list items
        // Remove trailing punctuation for cleaner list look, or keep it. Let's keep it but remove dot if strictly list item.
        if (text.endsWith('.')) text = text.slice(0, -1);
        
        if (i === 0 && startWithLorem) {
           text = STANDARD_START;
        }
        items.push(text);
      }

      if (asHtml) {
        result = "<ul>\n" + items.map(item => `  <li>${item}</li>`).join("\n") + "\n</ul>";
      } else {
        result = items.map(item => `• ${item}`).join("\n");
      }
      break;
    }
  }

  return result;
};
