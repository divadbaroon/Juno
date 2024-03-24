import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Header from "@/components/shared/Header";
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
      <Header
        title="Upgrade Your Plan"
        subtitle="Upgrade your plan to increase your alloted usage time for each day."
      />
      <section>
        <CreditsClient user={user} userPlan={userPlan} plans={plans} />
      </section>
    </>
  );
};

export default Credits;