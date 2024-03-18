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
      label: "Guide",
      route: "/guide",
      icon: "/assets/icons/guide.svg",
    },
    {
      label: "Profile",
      route: "/profile",
      icon: "/assets/icons/profile.svg",
    },
    {
      label: "Upgrade",
      route: "/credits",
      icon: "/assets/icons/unlock.svg",
    },
  ];
  
  export const plans = [
    {
      _id: 1,
      name: "Trial",
      icon: "/assets/icons/free-plan.svg",
      price: 0,
      usage: "15 minutes",
      inclusions: [
        
        {
          label: "API Keys provided",
          isIncluded: true,
        },
        {
          label: "Access to Entire Library", 
          isIncluded: true,
        },
        {
          label: "Full Access to Services",
          isIncluded: true,
        }
      ],
    },
    {
      _id: 2,
      name: "Standard",
      icon: "/assets/icons/free-plan.svg",
      price: 10,
      usage: "2 hours",
      inclusions: [
        {
          label: "API Keys provided",
          isIncluded: true,
        },
        {
          label: "Access to Entire Library",
          isIncluded: true,
        },
        {
          label: "Full Access to Services",
          isIncluded: true,
        }
      ],
    },
    {
      _id: 2,
      name: "Premium",
      icon: "/assets/icons/free-plan.svg",
      price: 25,
      usage: "6 hours",
      inclusions: [
        {
          label: "API Keys provided",
          isIncluded: true,
        },
        {
          label: "Access to Entire Library",
          isIncluded: true,
        },
        {
          label: "Full Access to Services",
          isIncluded: true,
        }
      ],
    }
  ];
  
  export const transformationTypes = {
    restore: {
      type: "restore",
      title: "Library",
      subTitle: "Browse throuh a collection of curated profiles with custom personialities, voices, and capabilities.",
      config: { restore: true },
      icon: "image.svg",
    },
    removeBackground: {
      type: "removeBackground",
      title: "Background Remove",
      subTitle: "Removes the background of the image using AI",
      config: { removeBackground: true },
      icon: "camera.svg",
    },
    fill: {
      type: "fill",
      title: "Create your ideal AI ",
      subTitle: "Take less than 3 minutes to create your ideal AI",
      config: { fillBackground: true },
      icon: "stars.svg",
    },
    remove: {
      type: "remove",
      title: "Object Remove",
      subTitle: "Identify and eliminate objects from images",
      config: {
        remove: { prompt: "", removeShadow: true, multiple: true },
      },
      icon: "scan.svg",
    },
    recolor: {
      type: "recolor",
      title: "Object Recolor",
      subTitle: "Identify and recolor objects from the image",
      config: {
        recolor: { prompt: "", to: "", multiple: true },
      },
      icon: "filter.svg",
    },
  };
  
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