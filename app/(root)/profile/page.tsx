import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Collection } from "@/components/shared/Collection";
import Header from "@/components/shared/Header";
import { getUserImages } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.actions";

const Profile = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  const images = await getUserImages({ page, userId: user._id });

  return (
    <>
      <Header title="Profile" />

      <section className="profile">
        {/* Credits card */}
        <div className="profile-balance">
          <p
            className="text-[11px] font-semibold uppercase tracking-widest mb-4"
            style={{ color: '#9ca3af', letterSpacing: '0.1em' }}
          >
            Credits Available
          </p>
          <div className="flex items-center gap-4">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-2xl"
              style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}
            >
              <Image
                src="/assets/icons/coins.svg"
                alt="credits"
                width={24}
                height={24}
              />
            </div>
            <div>
              <h2 className="text-[36px] font-bold tracking-tight leading-none" style={{ color: '#111827' }}>
                {user.creditBalance}
              </h2>
              <p className="text-[13px] mt-1" style={{ color: '#9ca3af' }}>credits remaining</p>
            </div>
          </div>
        </div>

        {/* Transformations card */}
        <div className="profile-image-manipulation">
          <p
            className="text-[11px] font-semibold uppercase tracking-widest mb-4"
            style={{ color: '#9ca3af', letterSpacing: '0.1em' }}
          >
            Transformations Done
          </p>
          <div className="flex items-center gap-4">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-2xl"
              style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}
            >
              <Image
                src="/assets/icons/photo.svg"
                alt="transformations"
                width={24}
                height={24}
              />
            </div>
            <div>
              <h2 className="text-[36px] font-bold tracking-tight leading-none" style={{ color: '#111827' }}>
                {images?.data.length}
              </h2>
              <p className="text-[13px] mt-1" style={{ color: '#9ca3af' }}>images processed</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <Collection
          images={images?.data}
          totalPages={images?.totalPages}
          page={page}
        />
      </section>
    </>
  );
};

export default Profile;