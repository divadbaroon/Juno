import { SignedIn, auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { plans } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import Checkout from "@/components/shared/Checkout";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const Credits = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId);

  // Get the user's current plan
  const userPlan = user.plan;

  return (
    <>
      <Header
        title="Upgrade Your Plan"
        subtitle="Upgrade your plan to increase your alloted usage time for each day."
      />
      <section>
        <ul className="credits-list">
          {plans.map((plan) => (
            <li
              key={plan.name}
              className={`credits-item ${
                plan.name === userPlan ? "active-plan" : ""
              }`}
            >
              <div className="flex-center flex-col gap-3">
                <Image src={plan.icon} alt="check" width={50} height={50} />
                <p className="p-20-semibold mt-2 text-purple-500">
                  {plan.name}
                </p>
                <p className="h1-semibold text-dark-600">${plan.price}</p>
                <p className="p-16-regular">
                  Usage/day: {plan.usage}{" "}
                  {plan.price === 0 ? "minutes" : "hours"}
                </p>
              </div>
              {/* Inclusions */}
              <ul className="flex flex-col gap-5 py-9">
                {plan.inclusions.map((inclusion) => (
                  <li
                    key={plan.name + inclusion.label}
                    className="flex items-center gap-4"
                  >
                    <Image
                      src={`/assets/icons/${
                        inclusion.isIncluded ? "check.svg" : "cross.svg"
                      }`}
                      alt="check"
                      width={24}
                      height={24}
                    />
                    <p className="p-16-regular">{inclusion.label}</p>
                  </li>
                ))}
              </ul>
              {plan.name === userPlan ? (
                <Button variant="outline" className="credits-btn">
                  Active
                </Button>
              ) : (
                <SignedIn>
                  <Checkout
                    plan={plan.name}
                    amount={plan.price}
                    credits={plan.usage}
                    buyerId={user._id}
                  />
                </SignedIn>
              )}
            </li>
          ))}
        </ul>
      </section>
      <div className="mt-12">
        <h2 className="h2-bold text-dark-600">Activate Your Plan</h2>
        <p className="p-16-regular mt-4 mb-4">
          Unlock premium features by entering a valid activation code.
        </p>
        <InputOTP maxLength={9}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={6} />
            <InputOTPSlot index={7} />
            <InputOTPSlot index={8} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </>
  );
};

export default Credits;