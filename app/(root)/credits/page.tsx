import { SignedIn, auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { plans } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import Checkout from "@/components/shared/Checkout";

const Credits = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  return (
    <>
      <Header
        title="Buy Credits"
        subtitle="Choose a credit package that suits your needs."
      />

      <section>
        <ul className="credits-list">
          {plans.map((plan) => (
            <li key={plan.name} className="credits-item">
              {/* Plan header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#9ca3af', letterSpacing: '0.1em' }}>
                    {plan.name}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[36px] font-bold tracking-tight" style={{ color: '#111827' }}>
                      ${plan.price}
                    </span>
                    <span className="text-[14px]" style={{ color: '#9ca3af' }}>/pack</span>
                  </div>
                  <p className="text-[13px] mt-1" style={{ color: '#6b7280' }}>
                    {plan.credits} credits included
                  </p>
                </div>
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-xl"
                  style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}
                >
                  <Image src={plan.icon} alt={plan.name} width={22} height={22} />
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full mb-5" style={{ background: '#f3f4f6' }} />

              {/* Inclusions */}
              <ul className="flex flex-col gap-3 mb-6">
                {plan.inclusions.map((inclusion) => (
                  <li
                    key={plan.name + inclusion.label}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0"
                      style={{
                        background: inclusion.isIncluded ? '#f0fdf4' : '#fafafa',
                        border: `1px solid ${inclusion.isIncluded ? '#bbf7d0' : '#e5e7eb'}`,
                      }}
                    >
                      <Image
                        src={`/assets/icons/${inclusion.isIncluded ? "check.svg" : "cross.svg"}`}
                        alt="status"
                        width={11}
                        height={11}
                        style={{ filter: inclusion.isIncluded ? 'none' : 'opacity(0.4)' }}
                      />
                    </div>
                    <p
                      className="text-[13.5px]"
                      style={{ color: inclusion.isIncluded ? '#374151' : '#9ca3af' }}
                    >
                      {inclusion.label}
                    </p>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {plan.name === "Free" ? (
                <Button
                  variant="outline"
                  className="credits-btn w-full py-2.5 text-[13.5px] rounded-lg"
                >
                  Current plan
                </Button>
              ) : (
                <SignedIn>
                  <Checkout
                    plan={plan.name}
                    amount={plan.price}
                    credits={plan.credits}
                    buyerId={user._id}
                  />
                </SignedIn>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Credits;