import { auth, signIn, signOut } from "@/auth"
import { BadgePlus, LogOut } from "lucide-react";
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

const Navbar = async () => {
    const session = await auth();

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
                                <span className="max-sm:hidden cursor-pointer">
                                    Create
                                </span>
                                <BadgePlus className="size-6 sm:hidden" />
                            </Link>

                            <form action={async () => {
                                "use server";
                                await signOut();
                            }}>
                                <button type="submit" className="hidden sm:block test-red-500 cursor-pointer">Logout</button>
                                <LogOut className="size-6 sm:hidden text-red-500"/>
                            </form>

                            <Link href={`/user/${session?.id}`} className="flex items-center md:gap-2 cursor-pointer">
                                <Avatar className="size-10" >
                                    <AvatarImage src={session?.user?.image as string} alt={session?.user?.name as string} />
                                    <AvatarFallback>AV</AvatarFallback>
                                </Avatar>
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