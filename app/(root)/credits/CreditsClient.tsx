"use client";

import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Checkout from "@/components/shared/Checkout";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { validateActivationCode } from "@/lib/actions/checkActivationCode.action";
import { updatePlan } from "@/lib/actions/user.actions";


interface CreditsClientProps {
    user: {
      _id: string;
      // Add other user properties as needed
    };
    userPlan: string;
    plans: Array<{
      _id: number; // Add the '_id' property
      name: string;
      price: number;
      usage: string; // Update the 'usage' property type to 'string'
      icon: string;
      inclusions: Array<{
        label: string;
        isIncluded: boolean;
      }>;
      // Add other plan properties as needed
    }>;
  }

const CreditsClient = ({ user, userPlan, plans }: CreditsClientProps) => {
  const [activationCode, setActivationCode] = useState("");

  const handleActivationCodeSubmit = async () => {
    if (activationCode.length === 9) {
      const plan = await validateActivationCode(parseInt(activationCode, 10));
      if (plan !== null) {
        // Check if the user already has the plan activated
        if (plan === userPlan) {
          console.log("You already have this plan activated.");
        } else {
          updatePlan(user._id, plan);
          console.log("Activation code is valid! Plan:", plan);
        }
      } else {
        console.log("Activation code is invalid or has no uses left.");
      }
    }
  };

  return (
    <>
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
              <p className="p-20-semibold mt-2 text-[#373737]">
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
                  credits={plan.usage.toString()}
                  buyerId={user._id}
                />
              </SignedIn>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-12">
        <h2 className="h2-bold text-dark-600">Activate Your Plan</h2>
        <p className="p-16-regular mt-4 mb-4">
          Unlock premium features by entering a valid activation code.
        </p>
        <InputOTP
          maxLength={9}
          value={activationCode}
          onChange={(value) => setActivationCode(value)}
        >
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
        <Button onClick={handleActivationCodeSubmit} className="mt-4">
            Activate
        </Button>      
    </div>
    </>
  );
};

export default CreditsClient;