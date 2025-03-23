import { client } from "@/sanity/lib/client";
import Ping from "./Ping"
import { GET_POST_VIEWS_QUERY } from "@/sanity/lib/quries";
import { writeClient } from "@/sanity/lib/write-client";
import { after } from "next/server"

const View = async ({ id }: { id: string }) => {

    const totalView = await client.withConfig({ useCdn: false }).fetch(GET_POST_VIEWS_QUERY, { id });

    after(async () => await writeClient
        .patch(id)
        .set({ views: (totalView?.views || 0) + 1 })
        .commit())



    return (
        <div className="view-container">
            <div className="absolute -top-2 -right-2">
                <Ping />
            </div>

            <div className="view-text">
                <span className="font-black">
                    {totalView?.views} {totalView?.views === 1 ? "View" : "Views"}
                </span>
            </div>
        </div>
    )
}

export default View