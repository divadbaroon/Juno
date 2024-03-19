import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/shared/Header";
import { getUserById } from "@/lib/actions/user.actions";

const Profile = async ({ searchParams }: SearchParamProps) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  return (
    <>
      <Header title="Dashboard" />

      <Separator className="my-4" />

      <section className="profile">
        <div className="profile-balance">
          <p className="p-14-medium md:p-16-medium">CURRENT PLAN</p>
          <div className="mt-4 flex items-center gap-4">
            <h2 className="h2-bold text-dark-600">Trial</h2>
          </div>
        </div>
        <div className="profile-image-manipulation">
          <p className="p-14-medium md:p-16-medium">USAGE FOR TODAY LEFT</p>
          <div className="mt-4 flex items-center gap-4">
            <h2 className="h2-bold text-dark-600">{15 + " Minutes"}</h2>
          </div>
        </div>
      </section>

      <Separator className="my-4 mb-8" />

        <Header title="My Collection" />
        <p className="p-20-regular text-dark-400" style={{ marginTop: '15px' }}>
          A collection of profiles, voices, extensions, and LLMs that you have either save or created.
        </p>        

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
    </>
  );
};

export default Profile;