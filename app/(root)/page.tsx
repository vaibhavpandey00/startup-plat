import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {

  const query = (await searchParams).query;

  const posts = [ {
    _id: '1',
    _createdAt: new Date(),
    views: 55,
    author: {
      _id: '1',
      name: 'John Doe'
    },
    description: 'This is a startup idea',
    image: 'https://images.pexels.com/photos/2085832/pexels-photo-2085832.jpeg?cs=srgb&dl=pexels-onewayupdesigns-2085832.jpg&fm=jpg',
    category: 'Robots',
    title: 'We Robots'
  } ];

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
          {posts?.length > 0 ? posts.map((post) => (
            <StartupCard key={post?._id} post={post} />
          )) : (
            <p className="no-result">No results found</p>
          )
          }
        </ul>
      </section>
    </>
  );
}
