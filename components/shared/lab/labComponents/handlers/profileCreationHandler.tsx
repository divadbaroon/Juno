import AWS from 'aws-sdk';
import { createProfileAction } from "@/lib/actions/createProfile";

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY_ID,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

const s3 = new AWS.S3();

interface ProfileData {
  name: string;
  description: string;
  llm: string;
  voice: string;
  extensions: string[];
  sharePreference: string;
  photo: File | null;
  creator: string;
  prompt: string;
  tags: string[];
  index?: number;
}

interface HandleCreateProfileParams {
  profileData: ProfileData;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCreated: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSection: React.Dispatch<React.SetStateAction<string | null>>;
  toast: any;
}

export const handleCreateProfile = async ({
  profileData,
  setIsLoading,
  setIsCreated,
  setOpenSection,
  toast
}: HandleCreateProfileParams) => {
  try {
    setIsLoading(true);
    let photoUrl = "";
    if (profileData.photo) {
      const fileExtension = profileData.photo.name.split('.').pop();
      const fileName = `${profileData.name}.${fileExtension}`;
      const uploadParams = {
        Bucket: 'junoprofiles',
        Key: fileName,
        Body: profileData.photo,
        ContentType: profileData.photo.type,
      };
      const uploadResult = await s3.upload(uploadParams).promise();
      photoUrl = uploadResult.Location;
    }
    const dataToSend = {
      ...profileData,
      photo: photoUrl,
      llm: profileData.llm || '',
    };
    await createProfileAction(dataToSend);
    setIsCreated(true);
    setOpenSection(null);
    toast({
      title: `${profileData.name} has been created!`,
      description: (
        <span>
          See your created profile in your{' '}
          <a href="/myCollection" className="underline">
          collection
          </a>
        </span>
      )
    });
  } catch (error) {
    console.error("Error creating profile:", error);
  } finally {
    setIsLoading(false);
  }
};