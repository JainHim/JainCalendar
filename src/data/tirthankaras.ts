export interface TirthankaraMetadata {
  number: number;
  name: string;
  aliases: string[];
  symbol: string; // Lanchhan with emoji
  mother: string;
  father: string;
  birthplace: string;
  mokshaPlace: string;
  stotra: string;
  jaapMantra: string;
}

export const TIRTHANKARAS_DATABASE: TirthankaraMetadata[] = [
  {
    number: 1,
    name: 'Rushabhdev (Adinath)',
    aliases: ['rushabhdev', 'adinath', 'rishabhdev', 'rishabhanatha'],
    symbol: 'Bull (Vrishabha / 🐂)',
    mother: 'Mata Marudevi',
    father: 'Raja Nabhi Rai',
    birthplace: 'Ayodhya',
    mokshaPlace: 'Kailash Parvat (Ashtapada)',
    stotra: 'Bhaktamara Stotra (by Acharya Manatunga)',
    jaapMantra: 'Om Hrim Arham Shree Rushabhdevaya Namah'
  },
  {
    number: 2,
    name: 'Ajitnath',
    aliases: ['ajitnath', 'ajitnatha'],
    symbol: 'Elephant (Gaja / 🐘)',
    mother: 'Mata Vijaya Devi',
    father: 'Raja Jitsatru',
    birthplace: 'Ayodhya',
    mokshaPlace: 'Shree Sammed Shikharji',
    stotra: 'Ajit Shanti Stotra',
    jaapMantra: 'Om Hrim Arham Shree Ajitnathaya Namah'
  },
  {
    number: 3,
    name: 'Sambhavnath',
    aliases: ['sambhavnath', 'sambhavanatha'],
    symbol: 'Horse (Ashva / 🐎)',
    mother: 'Mata Sena Devi',
    father: 'Raja Jitari',
    birthplace: 'Sravasti',
    mokshaPlace: 'Shree Sammed Shikharji',
    stotra: 'Sambhavnath Pujan & Stuti',
    jaapMantra: 'Om Hrim Arham Shree Sambhavnathaya Namah'
  },
  {
    number: 4,
    name: 'Abhinandannath',
    aliases: ['abhinandan', 'abhinandannath', 'abhinandanbhagwan'],
    symbol: 'Monkey (Kapi / 🐒)',
    mother: 'Mata Siddhartha Devi',
    father: 'Raja Sambara',
    birthplace: 'Ayodhya',
    mokshaPlace: 'Shree Sammed Shikharji',
    stotra: 'Abhinandan Swami Stuti',
    jaapMantra: 'Om Hrim Arham Shree Abhinandannathaya Namah'
  },
  {
    number: 5,
    name: 'Sumatinath',
    aliases: ['sumatinath', 'sumatinatha'],
    symbol: 'Heron / Curlew (Krouncha / 🦩)',
    mother: 'Mata Mangala Devi',
    father: 'Raja Megha',
    birthplace: 'Ayodhya',
    mokshaPlace: 'Shree Sammed Shikharji',
    stotra: 'Sumatinath Pujan Arghya',
    jaapMantra: 'Om Hrim Arham Shree Sumatinathaya Namah'
  },
  {
    number: 6,
    name: 'Padmaprabhu',
    aliases: ['padmaprabh', 'padmaprabhu', 'padmaprabha'],
    symbol: 'Red Lotus (Padma / 🪷)',
    mother: 'Mata Susima Devi',
    father: 'Raja Dhara',
    birthplace: 'Kausambi',
    mokshaPlace: 'Shree Sammed Shikharji',
    stotra: 'Padmaprabhu Chalisa & Stuti',
    jaapMantra: 'Om Hrim Arham Shree Padmaprabhaya Namah'
  },
  {
    number: 7,
    name: 'Suparshvanath',
    aliases: ['suparshvanath', 'suparshvanatha'],
    symbol: 'Swastika (卐)',
    mother: 'Mata Prithvi Devi',
    father: 'Raja Pratishtha',
    birthplace: 'Varanasi (Kashi)',
    mokshaPlace: 'Shree Sammed Shikharji',
    stotra: 'Suparshvanath Stotra',
    jaapMantra: 'Om Hrim Arham Shree Suparshvanathaya Namah'
  },
  {
    number: 8,
    name: 'Chandraprabhu',
    aliases: ['chandraprabh', 'chandraprabhu', 'chandraprabha'],
    symbol: 'Crescent Moon (Chandra / 🌙)',
    mother: 'Mata Lakshmana Devi',
    father: 'Raja Mahasena',
    birthplace: 'Chandrapuri',
    mokshaPlace: 'Shree Sammed Shikharji',
    stotra: 'Chandraprabhu Stotra & Chalisa',
    jaapMantra: 'Om Hrim Arham Shree Chandraprabhaya Namah'
  },
  {
    number: 9,
    name: 'Pushpadanta (Suvidhinath)',
    aliases: ['pushpadanta', 'suvidhinath', 'pushpadant'],
    symbol: 'Crocodile (Makara / 🐊)',
    mother: 'Mata Rama Devi',
    father: 'Raja Sugriva',
    birthplace: 'Kakandi',
    mokshaPlace: 'Shree Sammed Shikharji',
    stotra: 'Pushpadanta Stuti',
    jaapMantra: 'Om Hrim Arham Shree Pushpadantaya Namah'
  },
  {
    number: 10,
    name: 'Shitalnath',
    aliases: ['shitalnath', 'sitalanatha'],
    symbol: 'Srivatsa / Kalpavriksha (🌳)',
    mother: 'Mata Nanda Devi',
    father: 'Raja Dridharatha',
    birthplace: 'Bhadrapur',
    mokshaPlace: 'Shree Sammed Shikharji',
    stotra: 'Shitalnath Stotra',
    jaapMantra: 'Om Hrim Arham Shree Shitalnathaya Namah'
  },
  {
    number: 11,
    name: 'Shreyansnath',
    aliases: ['shreyansnath', 'shreyamasanatha'],
    symbol: 'Rhinoceros (Khadga / 🦏)',
    mother: 'Mata Vishnu Devi',
    father: 'Raja Vishnu',
    birthplace: 'Simhapuri',
    mokshaPlace: 'Shree Sammed Shikharji',
    stotra: 'Shreyansnath Pujan',
    jaapMantra: 'Om Hrim Arham Shree Shreyansnathaya Namah'
  },
  {
    number: 12,
    name: 'Vasupujya',
    aliases: ['vasupujya', 'vasupujyabhagwan'],
    symbol: 'Buffalo (Mahisha / 🦬)',
    mother: 'Mata Jaya Devi',
    father: 'Raja Vasupujya',
    birthplace: 'Champapuri',
    mokshaPlace: 'Champapuri (Bihar)',
    stotra: 'Vasupujya Digambar Stotra',
    jaapMantra: 'Om Hrim Arham Shree Vasupujyaya Namah'
  },
  {
    number: 13,
    name: 'Vimalnath',
    aliases: ['vimalnath', 'vimalanatha'],
    symbol: 'Boar (Varaha / 🐗)',
    mother: 'Mata Syama Devi',
    father: 'Raja Kritavarma',
    birthplace: 'Kampilaji',
    mokshaPlace: 'Shree Sammed Shikharji',
    stotra: 'Vimalnath Stuti',
    jaapMantra: 'Om Hrim Arham Shree Vimalnathaya Namah'
  },
  {
    number: 14,
    name: 'Anantnath',
    aliases: ['anantnath', 'anantanatha'],
    symbol: 'Porcupine / Bear (Sahi / 🦔)',
    mother: 'Mata Sarvayasas Devi',
    father: 'Raja Simhasena',
    birthplace: 'Ayodhya',
    mokshaPlace: 'Shree Sammed Shikharji',
    stotra: 'Anantnath Stotra',
    jaapMantra: 'Om Hrim Arham Shree Anantnathaya Namah'
  },
  {
    number: 15,
    name: 'Dharmanath',
    aliases: ['dharmanath', 'dharmanatha'],
    symbol: 'Thunderbolt (Vajra / ⚡)',
    mother: 'Mata Suvrata Devi',
    father: 'Raja Bhanu',
    birthplace: 'Ratnapuri',
    mokshaPlace: 'Shree Sammed Shikharji',
    stotra: 'Dharmanath Stuti',
    jaapMantra: 'Om Hrim Arham Shree Dharmanathaya Namah'
  },
  {
    number: 16,
    name: 'Shantinath',
    aliases: ['shantinath', 'santinatha'],
    symbol: 'Deer (Mriga / 🦌)',
    mother: 'Mata Achira Devi',
    father: 'Raja Viswasena',
    birthplace: 'Hastinapur',
    mokshaPlace: 'Shree Sammed Shikharji',
    stotra: 'Shanti Path & Shantinath Stotra',
    jaapMantra: 'Om Hrim Arham Shree Shantinathaya Namah'
  },
  {
    number: 17,
    name: 'Kunthunath',
    aliases: ['kunthunath', 'kunthunatha'],
    symbol: 'Goat (Aja / 🐐)',
    mother: 'Mata Sri Devi',
    father: 'Raja Sura',
    birthplace: 'Hastinapur',
    mokshaPlace: 'Shree Sammed Shikharji',
    stotra: 'Kunthunath Stuti',
    jaapMantra: 'Om Hrim Arham Shree Kunthunathaya Namah'
  },
  {
    number: 18,
    name: 'Aranath',
    aliases: ['aranath', 'aranatha'],
    symbol: 'Nandyavarta / Fish (🐟)',
    mother: 'Mata Mitra Devi',
    father: 'Raja Sudarsana',
    birthplace: 'Hastinapur',
    mokshaPlace: 'Shree Sammed Shikharji',
    stotra: 'Aranath Stuti',
    jaapMantra: 'Om Hrim Arham Shree Aranathaya Namah'
  },
  {
    number: 19,
    name: 'Mallinath',
    aliases: ['mallinath', 'mallinatha'],
    symbol: 'Kalasa (Water Jar / 🏺)',
    mother: 'Mata Raksita Devi',
    father: 'Raja Kumbha',
    birthplace: 'Mithilapuri',
    mokshaPlace: 'Shree Sammed Shikharji',
    stotra: 'Mallinath Stuti',
    jaapMantra: 'Om Hrim Arham Shree Mallinathaya Namah'
  },
  {
    number: 20,
    name: 'Munisuvratnath',
    aliases: ['munisuvrat', 'munisuvratnath', 'munisuvrata'],
    symbol: 'Tortoise (Kurma / 🐢)',
    mother: 'Mata Padmavati Devi',
    father: 'Raja Sumitra',
    birthplace: 'Rajgir (Rajgriha)',
    mokshaPlace: 'Shree Sammed Shikharji',
    stotra: 'Munisuvratnath Stotra & Chalisa',
    jaapMantra: 'Om Hrim Arham Shree Munisuvratnathaya Namah'
  },
  {
    number: 21,
    name: 'Naminath',
    aliases: ['naminath', 'naminatha'],
    symbol: 'Blue Lotus (Neel Kamal / 🪷)',
    mother: 'Mata Vapra Devi',
    father: 'Raja Vijaya',
    birthplace: 'Mithilapuri',
    mokshaPlace: 'Shree Sammed Shikharji',
    stotra: 'Naminath Stuti',
    jaapMantra: 'Om Hrim Arham Shree Naminathaya Namah'
  },
  {
    number: 22,
    name: 'Neminath (Arishtanemi)',
    aliases: ['neminath', 'arishtanemi', 'neminatha'],
    symbol: 'Conch (Shankha / 🐚)',
    mother: 'Mata Siva Devi',
    father: 'Raja Samudravijaya',
    birthplace: 'Sauripur (Dwarka)',
    mokshaPlace: 'Girnarji (Gujarat)',
    stotra: 'Neminath Stotra & Rajul-Nemi Geeta',
    jaapMantra: 'Om Hrim Arham Shree Neminathaya Namah'
  },
  {
    number: 23,
    name: 'Parshvanath',
    aliases: ['parshvanath', 'parshwanath', 'parshva', 'parasnath'],
    symbol: 'Serpent (Sarpa / 🐍)',
    mother: 'Mata Vama Devi',
    father: 'Raja Ashvasen',
    birthplace: 'Varanasi (Kashi)',
    mokshaPlace: 'Shree Sammed Shikharji (Parshvanath Tonk)',
    stotra: 'Parshvanath Stotra / Bhaktamara / Uvasaggaharam',
    jaapMantra: 'Om Hrim Arham Shree Parshvanathaya Namah'
  },
  {
    number: 24,
    name: 'Mahavir (Vardhman)',
    aliases: ['mahavir', 'mahavira', 'vardhman', 'vardhamana'],
    symbol: 'Lion (Simha / 🦁)',
    mother: 'Mata Trishala Devi',
    father: 'Raja Siddhartha',
    birthplace: 'Kundalpur / Kshatriyakund',
    mokshaPlace: 'Pavapuri (Bihar)',
    stotra: 'Mahavir Ashtak & Vardhman Stuti',
    jaapMantra: 'Om Hrim Arham Shree Mahaviraya Namah'
  }
];

export function findTirthankara(title: string): TirthankaraMetadata | undefined {
  const normalized = title.toLowerCase().replace(/[^a-z0-9]/g, '');
  return TIRTHANKARAS_DATABASE.find(t =>
    t.aliases.some(alias => normalized.includes(alias.replace(/[^a-z0-9]/g, '')))
  );
}
