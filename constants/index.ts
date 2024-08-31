export const navLinks = [
    {
      label: "Quick Start",
      route: "/quickstart",
      icon: "/assets/icons/bolt.svg",
    },
    {
      label: "Library",
      route: "/library",
      icon: "/assets/icons/book.svg",
    },
    {
      label: "Lab",
      route: "/lab",
      icon: "/assets/icons/beaker.svg",
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
      { value: 'coding', label: 'Coding' },
      { value: 'science', label: 'Science' },
      { value: 'history', label: 'History' },
      { value: 'nature', label: 'Nature' },
      { value: 'space', label: 'Space' },
      { value: 'technology', label: 'Technology' }
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
    value: 'use-case',
    label: 'Use Case',
    options: [
      { value: 'productivity', label: 'Productivity' },
      { value: 'entertainment', label: 'Entertainment' },
      { value: 'information-gathering', label: 'Information Gathering' },
      { value: 'hands-free-control', label: 'Hands-free Control' }
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
    value: 'integration',
    label: 'Integration',
    options: [
      { value: 'spotify', label: 'Spotify' },
      { value: 'google-calendar', label: 'Google Calendar' },
      { value: 'youtube', label: 'YouTube' },
      { value: 'web-browser', label: 'Web Browser' }
    ]
  }
];

export const promptFilterOptions: FilterType[] = [
  {
    value: 'context',
    label: 'Context',
    options: [
      { value: 'entertainment', label: 'Entertainment' },
      { value: 'educational', label: 'Educational' },
      { value: 'coding', label: 'Coding' },
    ]
  },
  {
    value: 'background',
    label: 'Background',
    options: [
      { value: 'historical', label: 'Historical' },
      { value: 'scientific', label: 'Scientific' },
      { value: 'cultural', label: 'Cultural' },
      { value: 'technical', label: 'Technical' },
      { value: 'general-knowledge', label: 'General Knowledge' },
    ]
  },
  {
    value: 'personality',
    label: 'Personality Traits',
    options: [
      { value: 'friendly', label: 'Friendly' },
      { value: 'professional', label: 'Professional' },
      { value: 'humorous', label: 'Humorous' },
      { value: 'empathetic', label: 'Empathetic' },
      { value: 'analytical', label: 'Analytical' },
    ]
  },
  {
    value: 'interaction-style',
    label: 'Interaction Style',
    options: [
      { value: 'conversational', label: 'Conversational' },
      { value: 'formal', label: 'Formal' },
      { value: 'instructional', label: 'Instructional' },
      { value: 'question-answering', label: 'Question-Answering' },
      { value: 'storytelling', label: 'Storytelling' },
    ]
  },
  {
    value: 'temperature',
    label: 'Temperature',
    options: [
      { value: 'low', label: 'Low (More Predictable)' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High (More Creative)' },
    ]
  }
];

