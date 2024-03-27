import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { plans } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import CreditsClient from "./CreditsClient";

const Credits = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId);
  const userPlan = user.plan;

  return (
    <>
      <div className="root-container">
        <div className="about-section">
          <div className="space-y-6">
            <h4 className="h2-bold text-dark-600" style={{ fontSize: '55px', marginTop: '10px'}}>
              Upgrade
            </h4>
            <p className="p-20-regular text-dark-400" style={{ marginTop: '15px' }}>
              Upgrade your plan to increase your alloted time of usage.
            </p>
          </div>
        </div>
      </div>
      <Separator className="-my-6" />
      <section>
        <CreditsClient user={user} userPlan={userPlan} plans={plans} />
      </section>
    </>
  );
};

export default Credits;