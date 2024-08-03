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
      label: "Dashboard",
      route: "/dashboard",
      icon: "/assets/icons/chart.svg",
    },
    {
      label: "My Collection",
      route: "/myCollection",
      icon: "/assets/icons/folder.svg",
    },
    {
      label: "Guide",
      route: "/guide",
      icon: "/assets/icons/guide.svg",
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
      usage: "15",
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
      usage: "2",
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
      usage: "6",
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