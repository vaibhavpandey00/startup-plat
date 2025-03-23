import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/quries";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {

  const query = (await searchParams).query;
  const params = { search: query || null };

  const { data: posts } = await sanityFetch({
    query: STARTUPS_QUERY,
    params
  });

  return (
    <>
      <section className="pink_container">

        <h1 className="heading">Pitch Your Startup, <br /> Get Funding</h1>

        <p className="sub-heading !max-w-3xl" >Submit Ideas, Vote on Pitches, and get noticed by investors</p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Showing results for "${query}"` : "Latest Startups"}
        </p>

        <ul className="card_grid mt-7">
          {posts?.length > 0 ? posts.map((post: StartupTypeCard) => (
            <StartupCard key={post?._id} post={post} />
          )) : (
            <p className="no-result">No results found</p>
          )
          }
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
