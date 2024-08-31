import AWS from 'aws-sdk';
import { createPromptAction } from "@/lib/actions/createPrompt";

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY_ID,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

const s3 = new AWS.S3();

interface HandleCreatePromptParams {
  promptData: {
    name: string;
    description: string;
    personality: string;
    context: string;
    interactionGuidelines: string;
    sharePreference: string;
    background: string;
    temperature: number;
    creator: string;
    objectURL: string;
    tags: string[];
  };
  photo: File | null;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCreated: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSection: React.Dispatch<React.SetStateAction<string | null>>;
  toast: any;
}

export const handleCreatePrompt = async ({
  promptData,
  photo,
  setIsLoading,
  setIsCreated,
  setOpenSection,
  toast
}: HandleCreatePromptParams) => {
  try {
    setIsLoading(true);
    let objectURL = "";
    if (photo) {
      const fileExtension = photo.name.split('.').pop();
      const fileName = `${promptData.name}_prompt.${fileExtension}`;
      const uploadParams = {
        Bucket: 'junoprompts',
        Key: fileName,
        Body: photo,
        ContentType: photo.type,
      };
      const uploadResult = await s3.upload(uploadParams).promise();
      objectURL = uploadResult.Location;
    }
    const dataToSend = {
      ...promptData,
      objectURL,
    };
    console.log(dataToSend.tags)
    await createPromptAction(dataToSend);
    setIsCreated(true);
    setOpenSection(null);
    toast({
      title: `${promptData.name} prompt has been created!`,
      description: (
        <span>
          See your created prompt in your{' '}
          <a href="/myCollection" className="underline">
            collection
          </a>
        </span>
      )
    });
  } catch (error) {
    console.error("Error creating prompt:", error);
    toast({
      title: "Error",
      description: "Failed to create prompt. Please try again.",
      variant: "destructive"
    });
  } finally {
    setIsLoading(false);
  }
};