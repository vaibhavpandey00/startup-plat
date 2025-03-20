import { auth, signIn, signOut } from "@/auth"
import Image from "next/image"
import Link from "next/link"

const Navbar = async () => {
    const session = await auth();
    // console.log(session);


    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={55} height={30} />
                </Link>

                <div className="flex items-center gap-5 text-xl text-black">
                    {session && session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span className="cursor-pointer">
                                    Creat
                                </span>
                            </Link>

                            <form action={async () => {
                                "use server";
                                await signOut();
                            }}>
                                <button type="submit" className="cursor-pointer">Logout</button>
                            </form>

                            <Link href={`/user/${session?.id}`}>
                                <span className="cursor-pointer">{session?.user?.name}</span>
                            </Link>
                        </>

                    ) : (<>
                        <form action={async () => {
                            "use server";
                            await signIn('github');
                        }}>
                            <button type="submit" className="text-xl text-black font-bold cursor-pointer">LogIn</button>
                        </form>
                    </>
                    )
                    }
                </div>
            </nav>
        </header >
    )
}

export default Navbar