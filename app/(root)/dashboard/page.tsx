import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { getUserById } from "@/lib/actions/user.actions";

interface SearchParamProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Profile = async ({ searchParams }: SearchParamProps) => {
  // Redirect to sign-in page if user is not authenticated
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  // Get user by ID
  const user = await getUserById(userId);

  // Get the user's current plan
  const userPlan = user.plan;

  // Convert timeLeft from seconds to hours, minutes, and seconds
  const userTimeLeft = user.usageLeft;
  const hours = Math.floor(userTimeLeft / 3600);
  const minutes = Math.floor((userTimeLeft % 3600) / 60);
  const seconds = userTimeLeft % 60;

  // Format timeLeft as a string
  const timeLeftString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="root-container">
      <div className="about-section">
        <div className="space-y-6">
          <h4 className="h2-bold text-dark-600" style={{ fontSize: '55px', marginTop: '-40px' }}>
            Dashboard
          </h4>
          <p className="p-20-regular text-dark-400" style={{ marginTop: '15px' }}>
            Your profile usage and information
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <section className="profile">
        <div className="profile-balance">
          <p className="p-14-medium md:p-16-medium">CURRENT PLAN</p>
          <div className="mt-4 flex items-center gap-4">
            <h2 className="h2-bold text-dark-600">{userPlan}</h2>
          </div>
        </div>
        <div className="profile-image-manipulation">
          <p className="p-14-medium md:p-16-medium">USAGE FOR TODAY LEFT</p>
          <div className="mt-4 flex items-center gap-4">
            <h2 className="h2-bold text-dark-600">{timeLeftString}</h2>
          </div>
        </div>
      </section>
      <Separator className="my-4" />
      <div className="about-section">
        <div className="space-y-6">
          <h4 className="h2-bold text-dark-600" style={{ fontSize: '55px', marginTop: '20px' }}>
            Collection
          </h4>
          <p className="p-20-regular text-dark-400" style={{ marginTop: '15px' }}>
            A collection of profiles, voices, extensions, and LLMs that you have either saved or created.
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div className="p-20-regular text-dark-400 cursor-pointer">Profiles</div>
        <Separator orientation="vertical" />
        <div className="p-20-regular text-dark-400 cursor-pointer">Extensions</div>
        <Separator orientation="vertical" />
        <div className="p-20-regular text-dark-400 cursor-pointer">Voices</div>
        <Separator orientation="vertical" />
        <div className="p-20-regular text-dark-400 cursor-pointer">LLMs</div>
        <Separator orientation="vertical" />
      </div>
      <Separator className="my-4" />
    </div>
  );
};

export default Profile;