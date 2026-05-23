export interface VideoThumbnail {
  id: string;
  title: string;
  duration: string;
  category: string;
}

export interface WildlifeSpecies {
  id: string;
  index: string;
  commonName: string;
  scientificName: string;
  status: 'Endangered' | 'Critically Endangered' | 'Vulnerable';
  population: string;
  coordinates: string;
  biome: string;
  region: string;
  bannerTitle: string;
  descriptionLeft: string;
  descriptionRight: string;
  image: string;
  videoThumbnails: VideoThumbnail[];
  additionalFacts: string[];
  ambientFrequency: number; // Hz for Web Audio synthesizer oscillator
  trailDifficulty: 'Moderate' | 'Demanding' | 'Hard';
  trailPoints: Array<{ name: string; x: number; y: number; info: string }>;
}
