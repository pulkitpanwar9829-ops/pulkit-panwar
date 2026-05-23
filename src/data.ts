import { WildlifeSpecies } from './types';

export const WILDLIFE_DATA: WildlifeSpecies[] = [
  {
    id: 'bengal_tiger',
    index: '01',
    commonName: 'Bengal Tiger',
    scientificName: 'Panthera tigris tigris',
    status: 'Endangered',
    population: '~3,900 individuals left',
    coordinates: '21.9497° N, 89.1833° E',
    biome: 'Mangroves & Swamp Grasslands',
    region: 'Sundarbans Biosphere',
    bannerTitle: 'ADVENTURE IN THE FOREST',
    descriptionLeft: 'Deep in the marshy woodlands and swampy islands of the Sundarbans, the apex predator moves with silent, absolute purpose. Perfectly camouflaged amidst the vertical shadows of mangroves, every muscle tuned for stealth.',
    descriptionRight: 'As rising sea levels alter coastal boundaries, tracking and protecting their natural pathways becomes critical. Witness their magnificent strength and aid in preserving these pristine ancient hunting grounds.',
    image: '/src/assets/images/bengal_tiger_177954557824.png',
    ambientFrequency: 145, // Robust low growl/rumble pitch
    trailDifficulty: 'Demanding',
    videoThumbnails: [
      {
        id: 'tiger_1',
        title: 'Dawn Patrol in Mangroves',
        duration: '4:20',
        category: 'behavior'
      },
      {
        id: 'tiger_2',
        title: 'Preservation of Wildlife',
        duration: '6:45',
        category: 'conservation'
      }
    ],
    additionalFacts: [
      'Individually unique stripe patterns serve as natural biometric identifiers.',
      'Unlike normal domestic felines, Bengal tigers are spectacular swimmer-hunters.',
      'Scent marking territories spans across 100 square kilometers of swamp land.'
    ],
    trailPoints: [
      { name: 'Sajnekhali Guard Tower', x: 25, y: 35, info: 'Early morning fresh tracks spotted near fresh-water ponds.' },
      { name: 'Sudhanyakhali Salt Leak', x: 48, y: 55, info: 'Active visual traps capture nocturnal migration.' },
      { name: 'Dobanki Canopy Walk', x: 72, y: 40, info: 'High-altitude walkway through mangrove tops.' },
      { name: 'Haldibari border post', x: 85, y: 75, info: 'Territorial borders monitored via acoustic sensors.' }
    ]
  },
  {
    id: 'black_panther',
    index: '02',
    commonName: 'Black Panther',
    scientificName: 'Panthera pardus (melanistic)',
    status: 'Vulnerable',
    population: 'Circa ~12% of leopards in wet biomes',
    coordinates: '15.2993° N, 74.1240° E',
    biome: 'Dense Wet Evergreen Canopy',
    region: 'Kabini & Western Ghats',
    bannerTitle: 'SHADOWS OF THE CANOPY',
    descriptionLeft: 'Underneath high forest umbrellas where daylight filters with hesitation, a ghost rules the canopy. Melanistic leopard profiles blend into tree bark, detectable primarily by their piercing, golden-emerald gaze.',
    descriptionRight: 'Navigating wet heights requires supreme coordination. Studying their arboreal patrol patterns reveals intricate details on rainforest balance and the continuous struggle for territory.',
    image: '/src/assets/images/black_panther_1779545580349.png',
    ambientFrequency: 180, // Ghostly sleek purr pitch
    trailDifficulty: 'Hard',
    videoThumbnails: [
      {
        id: 'panther_1',
        title: 'Ghost of the Western Canopy',
        duration: '5:12',
        category: 'behavior'
      },
      {
        id: 'panther_2',
        title: 'Night Tree Camera Trapping',
        duration: '8:03',
        category: 'patrol'
      }
    ],
    additionalFacts: [
      'Melanism is recessive; close examination reveals faint underlying rosettes called ghost stripes.',
      'Extremely territorial climber; spends 80% of day-hours hidden over 30 feet in the canopy tree forks.',
      'Superlative hearing lets them detect cricket flight paths in tropical microclimates.'
    ],
    trailPoints: [
      { name: 'Kabini Forest Gateway', x: 15, y: 25, info: 'Dense underbrush entry, misty mornings.' },
      { name: 'The Ancient Banyan Tree', x: 42, y: 45, info: 'Nesting climber resting fork, high-activity area.' },
      { name: 'Rain pool streams', x: 65, y: 70, info: 'Nocturnal hydration spot with sensor logs.' },
      { name: 'Forest Edge Ridge', x: 88, y: 50, info: 'High rocky cliffs bordering the evergreen valley.' }
    ]
  },
  {
    id: 'asian_elephant',
    index: '03',
    commonName: 'Asian Elephant',
    scientificName: 'Elephas maximus',
    status: 'Endangered',
    population: '~48,000 remaining',
    coordinates: '11.6514° N, 76.2711° E',
    biome: 'Deciduous River Valleys',
    region: 'Nilgiri Biosphere Reserve',
    bannerTitle: 'GIANTS OF EMERALD RIVER',
    descriptionLeft: 'Bending thick forest giants and clearing pathways for undergrowth, these megaherbivores are the creators of forest architecture. Matriarch-led herds cruise river basins, communicating across miles via infrasound.',
    descriptionRight: 'Securing structural corridors between state reserves is the single most vital component of their long-term survival. Support the protection of ancient migratory river-crossing networks today.',
    image: '/src/assets/images/asian_elephant_1779545599874.png',
    ambientFrequency: 110, // Deep low sub-bass rumble
    trailDifficulty: 'Moderate',
    videoThumbnails: [
      {
        id: 'elephant_1',
        title: 'River Crossing Rituals',
        duration: '3:50',
        category: 'social'
      },
      {
        id: 'elephant_2',
        title: 'Corridors of the Blue Mountains',
        duration: '7:15',
        category: 'conservation'
      }
    ],
    additionalFacts: [
      'Play crucial keystone role by dispersing seeds and creating natural micro-roads in thick tall grasslands.',
      'Communicate using low infrasound ground waves that travel miles through solid soil substrates.',
      'Require up to 150 kilograms of daily foliage intake, making expansive migration corridors essential.'
    ],
    trailPoints: [
      { name: 'Moyar River Gorge', x: 20, y: 65, info: 'Standard river-crossing lane for families during dawning sun.' },
      { name: 'Mudumalai Scrub Plains', x: 50, y: 35, info: 'Rich feeding grounds with high tall grass presence.' },
      { name: 'Nilgiri Foothills Corridor', x: 70, y: 58, info: 'Critical visual checking station with RFID scanners.' },
      { name: 'Bhavani River Delta', x: 90, y: 45, info: 'Annual gathering place for multiple state herds.' }
    ]
  }
];
