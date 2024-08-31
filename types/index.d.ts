/* eslint-disable no-unused-vars */

// ====== USER PARAMS
declare type CreateUserParams = {
    clerkId: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    photo: string;
  };
  
  declare type UpdateUserParams = {
    firstName: string;
    lastName: string;
    username: string;
    photo: string;
  };

  declare type UpdateUserCollection = {
    profiles: string[];
    llms: string[];
    voices: string[];
    extensions: string[];
  };

  declare type User = {
    _id: string;
    clerkId: string;
    email: string;
    username: string;
    photo: string;
    firstName: string | null;
    lastName: string | null;
    usageLeft: number;
    plan: string;
    userCollection: {
      profiles: string[];
      llms: string[];
      voices: string[];
      extensions: string[];
    };
    __v: number;
  }
  
  declare type ProfilesProps = {
    user: UserDetails;
    contextType: string;
    libraryType: string;
    h2Text: string;
    pText: string;
    onReload: () => void;
    onSelect?: (selectedItem: Data | null) => void; 
    activeFilters?: { [key: string]: string };
    selectedCardId?: string | string[] | null;
}
  
  declare type Data = {
    _id: string;
    name: string;
    creator: string;
    description: string;
    sharePreference: string;
    createdAt: string;
    updatedAt: string;
    objectURL?: string;
    photo?: string;
    link?: string;
    index: number;
    tags?: string[];
  }
  
  // ====== IMAGE PARAMS
  declare type AddImageParams = {
    image: {
      title: string;
      publicId: string;
      transformationType: string;
      width: number;
      height: number;
      config: any;
      secureURL: string;
      transformationURL: string;
      aspectRatio: string | undefined;
      prompt: string | undefined;
      color: string | undefined;
    };
    userId: string;
    path: string;
  };
  
  declare type UpdateImageParams = {
    image: {
      _id: string;
      title: string;
      publicId: string;
      transformationType: string;
      width: number;
      height: number;
      config: any;
      secureURL: string;
      transformationURL: string;
      aspectRatio: string | undefined;
      prompt: string | undefined;
      color: string | undefined;
    };
    userId: string;
    path: string;
  };
  
  declare type Transformations = {
    restore?: boolean;
    fillBackground?: boolean;
    remove?: {
      prompt: string;
      removeShadow?: boolean;
      multiple?: boolean;
    };
    recolor?: {
      prompt?: string;
      to: string;
      multiple?: boolean;
    };
    removeBackground?: boolean;
  };
  
  // ====== TRANSACTION PARAMS
  declare type CheckoutTransactionParams = {
    plan: string;
    credits: string;
    amount: number;
    buyerId: string;
  };
  
  declare type CreateTransactionParams = {
    stripeId: string;
    amount: number;
    credits: number;
    plan: string;
    buyerId: string;
    createdAt: Date;
  };
  
  declare type TransformationTypeKey =
    | "restore"
    | "fill"
    | "remove"
    | "recolor"
    | "removeBackground";
  
  // ====== URL QUERY PARAMS
  declare type FormUrlQueryParams = {
    searchParams: string;
    key: string;
    value: string | number | null;
  };
  
  declare type UrlQueryParams = {
    params: string;
    key: string;
    value: string | null;
  };
  
  declare type RemoveUrlQueryParams = {
    searchParams: string;
    keysToRemove: string[];
  };
  
  declare type SearchParamProps = {
    params: { id: string; type: TransformationTypeKey };
    searchParams: { [key: string]: string | string[] | undefined };
  };
  
  // ====== CARD PARAMS
  declare type DisplayCardProps = {
    clerkId: string; 
    contextType: string;
    type: string;
    title: string;
    creator: string;
    blobURL?: string;
    link?: string;
    description: string;
    photo?: string;
    isSelected: boolean;
    onSelect: () => void;
    userCollection: {
      profiles: string[];
      llms: string[];
      voices: string[];
      extensions: string[];
    };
    isInCollection: boolean;
    additionalInfo?: string;
    onReload: () => void;
    models: string[];
    allItems: any;
  }

  declare type CreateProfileParams = {
    name: string;
    llm: string;
    description: string;
    voice: string;
    extensions: string[];
    sharePreference: string;
    prompt: string;
    photo: string;
    creator: string;
    tags: string[];
  };

  declare type CreatePromptParams = {
    name: string;
    creator: string;
    description: string;
    sharePreference: string;
    personality: string;
    context: string;
    interactionGuidelines: string;
    background: string;
    temperature: number;
    tags: string[]; 
  };


  declare type UpdateProfileParams = Partial<CreateProfileParams>;
  
  
