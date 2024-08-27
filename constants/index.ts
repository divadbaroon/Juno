export const navLinks = [
    {
      label: "Quick Start",
      route: "/quickstart",
      icon: "/assets/icons/bolt.svg",
    },
    {
      label: "Lab",
      route: "/lab",
      icon: "/assets/icons/beaker.svg",
    },
    {
      label: "Library",
      route: "/library",
      icon: "/assets/icons/book.svg",
    },
    {
      label: "My Collection",
      route: "/myCollection",
      icon: "/assets/icons/folder.svg",
    },
    {
      label: "Dashboard",
      route: "/dashboard",
      icon: "/assets/icons/chart.svg",
    },
    {
      label: "Guide",
      route: "/guide",
      icon: "/assets/icons/guide.svg",
    },
    {
      label: "Upgrade",
      route: "/upgrade",
      icon: "/assets/icons/upgrade.svg",
    },
  ];
  
  export const plans = [
    {
      _id: 1,
      name: "Free",
      icon: "/assets/icons/free-plan.svg",
      price: 0,
      usage: "Unlimited",
      inclusions: [
        
        {
          label: "API Keys provided",
          isIncluded: false,
        },
        {
          label: "Full Access to Services", 
          isIncluded: true,
        },
        {
          label: "Low Latency Responses",
          isIncluded: true,
        }
      ],
    },
    {
      _id: 2,
      name: "Standard",
      icon: "/assets/icons/free-plan.svg",
      price: 10,
      usage: "2",
      inclusions: [
        {
          label: "API Keys provided",
          isIncluded: true,
        },
        {
          label: "Full Access to Services",
          isIncluded: true,
        },
        {
          label: "Low Latency Responses",
          isIncluded: true,
        }
      ],
    },
    {
      _id: 2,
      name: "Premium",
      icon: "/assets/icons/free-plan.svg",
      price: 25,
      usage: "6",
      inclusions: [
        {
          label: "API Keys provided",
          isIncluded: true,
        },
        {
          label: "Full Access to Services",
          isIncluded: true,
        },
        {
          label: "Low Latency Responses",
          isIncluded: true,
        }
      ],
    }
  ];
  
  export const aspectRatioOptions = {
    "1:1": {
      aspectRatio: "1:1",
      label: "Square (1:1)",
      width: 1000,
      height: 1000,
    },
    "3:4": {
      aspectRatio: "3:4",
      label: "Standard Portrait (3:4)",
      width: 1000,
      height: 1334,
    },
    "9:16": {
      aspectRatio: "9:16",
      label: "Phone Portrait (9:16)",
      width: 1000,
      height: 1778,
    },
  };
  
  export const defaultValues = {
    title: "",
    aspectRatio: "",
    color: "",
    prompt: "",
    publicId: "",
  };
  
  export const creditFee = -1;

  export interface FilterOption {
    value: string;
    label: string;
  }
  
  export interface FilterType {
    value: string;
    label: string;
    options: FilterOption[];
  }

export const profileFilterOptions: FilterType[] = [
  { 
    value: 'genre', 
    label: 'Genre',
    options: [
      { value: 'celebrity', label: 'Celebrity' },
      { value: 'expert', label: 'Expert' },
      { value: 'scifi', label: 'Sci-Fi' },
      { value: 'techie', label: 'Techie' },
      { value: 'artist', label: 'Artist' }
    ]
  },
  {
    value: 'expertise',
    label: 'Expertise',
    options: [
      { value: 'digital-art', label: 'Digital Art' },
      { value: 'animation', label: 'Animation' },
      { value: 'graphic-design', label: 'Graphic Design' },
      { value: '3d-modeling', label: '3D Modeling' },
      { value: 'natural-history', label: 'Natural History' }
    ]
  },
  {
    value: 'personality',
    label: 'Personality',
    options: [
      { value: 'creative', label: 'Creative' },
      { value: 'friendly', label: 'Friendly' },
      { value: 'passionate', label: 'Passionate' },
      { value: 'detail-oriented', label: 'Detail-oriented' },
      { value: 'innovative', label: 'Innovative' },
      { value: 'patient', label: 'Patient' },
      { value: 'enthusiastic', label: 'Enthusiastic' },
      { value: 'adaptable', label: 'Adaptable' },
      { value: 'inquisitive', label: 'Inquisitive' }
    ]
  },
  {
    value: 'context',
    label: 'Work Context',
    options: [
      { value: 'studio', label: 'Studio' },
      { value: 'collaboration', label: 'Collaboration' },
      { value: 'nature', label: 'Nature' }
    ]
  },
  { 
    value: 'gender', 
    label: 'Gender',
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' }
    ]
  },
  { 
    value: 'age', 
    label: 'Age',
    options: [
      { value: 'young', label: 'Young' },
      { value: 'middle', label: 'Middle-aged' },
      { value: 'old', label: 'Old' }
    ]
  }
];

export const llmFilterOptions: FilterType[] = [
  {
    value: 'provider',
    label: 'Provider',
    options: [
      { value: 'openai', label: 'OpenAI' },
      { value: 'google', label: 'Google DeepMind' },
      { value: 'meta', label: 'Meta' },
      { value: 'mistral', label: 'Mistral AI' },
      { value: 'alibaba', label: 'Alibaba Cloud' },
      { value: 'microsoft', label: 'Microsoft Research' },
      { value: 'independent', label: 'Independent Researchers' }
    ]
  },
  {
    value: 'modelSize',
    label: 'Model Size',
    options: [
      { value: 'small', label: 'Small (< 10B parameters)' },
      { value: 'medium', label: 'Medium (10B - 100B parameters)' },
      { value: 'large', label: 'Large (> 100B parameters)' }
    ]
  },
  {
    value: 'specialization',
    label: 'Specialization',
    options: [
      { value: 'general', label: 'General Purpose' },
      { value: 'coding', label: 'Coding' },
      { value: 'math', label: 'Mathematics' },
      { value: 'medical', label: 'Medical' },
      { value: 'multimodal', label: 'Multimodal' },
      { value: 'uncensored', label: 'Uncensored' }
    ]
  },
  {
    value: 'licenseType',
    label: 'License Type',
    options: [
      { value: 'proprietary', label: 'Proprietary' },
      { value: 'open-source', label: 'Open Source' }
    ]
  },
  {
    value: 'contextLength',
    label: 'Context Length',
    options: [
      { value: 'short', label: 'Short (< 4K tokens)' },
      { value: 'medium', label: 'Medium (4K - 8K tokens)' },
      { value: 'long', label: 'Long (> 8K tokens)' }
    ]
  },
  {
    value: 'performanceLevel',
    label: 'Performance Level',
    options: [
      { value: 'high', label: 'High Performance' },
      { value: 'balanced', label: 'Balanced' },
      { value: 'efficient', label: 'Efficiency-Focused' }
    ]
  }
];

export const voiceFilterOptions: FilterType[] = [
  {
    value: 'provider',
    label: 'Provider',
    options: [
      { value: 'elevenlabs', label: 'ElevenLabs' },
      { value: 'openai', label: 'OpenAI' }
    ]
  },
  {
    value: 'gender',
    label: 'Gender',
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' }
    ]
  },
  {
    value: 'age',
    label: 'Age',
    options: [
      { value: 'child', label: 'Child' },
      { value: 'young', label: 'Young' },
      { value: 'middle-aged', label: 'Middle-aged' },
      { value: 'mature', label: 'Mature' }
    ]
  },
  {
    value: 'accent',
    label: 'Accent',
    options: [
      { value: 'american', label: 'American' },
      { value: 'british', label: 'British' },
      { value: 'german', label: 'German' },
      { value: 'spanish', label: 'Spanish' },
      { value: 'indian', label: 'Indian' }
    ]
  },
  {
    value: 'tone',
    label: 'Tone',
    options: [
      { value: 'neutral', label: 'Neutral' },
      { value: 'warm', label: 'Warm' },
      { value: 'energetic', label: 'Energetic' },
      { value: 'calm', label: 'Calm' },
      { value: 'confident', label: 'Confident' },
      { value: 'soft', label: 'Soft' },
      { value: 'deep', label: 'Deep' },
      { value: 'mysterious', label: 'Mysterious' }
    ]
  },
  {
    value: 'character',
    label: 'Character',
    options: [
      { value: 'realistic', label: 'Realistic' },
      { value: 'synthetic', label: 'Synthetic' },
      { value: 'celebrity', label: 'Celebrity' }
    ]
  },
  {
    value: 'use-case',
    label: 'Use Case',
    options: [
      { value: 'narration', label: 'Narration' },
      { value: 'educational', label: 'Educational' },
      { value: 'meditation', label: 'Meditation' },
      { value: 'animation', label: 'Animation' }
    ]
  }
];

export const extensionFilterOptions: FilterType[] = [
  {
    value: 'functionality',
    label: 'Functionality',
    options: [
      { value: 'text-processing', label: 'Text Processing' },
      { value: 'web-browsing', label: 'Web Browsing' },
      { value: 'media-control', label: 'Media Control' },
      { value: 'scheduling', label: 'Scheduling' },
      { value: 'content-understanding', label: 'Content Understanding' }
    ]
  },
  {
    value: 'integration',
    label: 'Integration',
    options: [
      { value: 'spotify', label: 'Spotify' },
      { value: 'google-calendar', label: 'Google Calendar' },
      { value: 'youtube', label: 'YouTube' },
      { value: 'web-browser', label: 'Web Browser' }
    ]
  },
  {
    value: 'interaction-method',
    label: 'Interaction Method',
    options: [
      { value: 'voice-control', label: 'Voice Control' },
      { value: 'text-highlight', label: 'Text Highlight' },
      { value: 'automatic', label: 'Automatic' }
    ]
  },
  {
    value: 'use-case',
    label: 'Use Case',
    options: [
      { value: 'productivity', label: 'Productivity' },
      { value: 'entertainment', label: 'Entertainment' },
      { value: 'information-gathering', label: 'Information Gathering' },
      { value: 'hands-free-control', label: 'Hands-free Control' }
    ]
  }
];

