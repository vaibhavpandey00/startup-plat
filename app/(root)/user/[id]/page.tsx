import { auth } from '@/auth';
import { client } from '@/sanity/lib/client';
import { USER_BY_ID_QUERY } from '@/sanity/lib/quries';
import { notFound, redirect } from 'next/navigation';
import Image from "next/image";
import UserStartups from '@/components/UserStartups';
import { Suspense } from "react";
import { StartupCardSkeleton } from "@/components/StartupCard";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const session = await auth();
    if (!session) return redirect('/');

    const id = (await params).id;
    const user = await client.withConfig({ useCdn: false }).fetch(USER_BY_ID_QUERY, { id });

    if (!user) return notFound();

    return (
        <>
            <section className="profile_container">
                <div className="profile_card">
                    <div className="profile_title">
                        <h3 className="text-24-black uppercase text-center line-clamp-1">
                            {user.name}
                        </h3>
                    </div>

                    <Image
                        src={user.image}
                        alt={user.name}
                        width={220}
                        height={220}
                        className="profile_image"
                    />

                    <p className="text-30-extrabold mt-7 text-center">
                        @{user?.userName}
                    </p>
                    <p className="mt-1 text-center text-14-normal">{user?.bio}</p>
                </div>

                <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
                    <p className="text-30-bold">
                        {session?.id === id ? "Your" : "All"} Startups
                    </p>
                    <ul className="card_grid-sm">
                        <Suspense fallback={<StartupCardSkeleton />}>
                            <UserStartups id={id} />
                        </Suspense>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default page