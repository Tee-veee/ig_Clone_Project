// COMP
import Stories from "./Stories";
import Posts from "./Posts";
import ProfileCard from "./ProfileCard";
import Suggestions from "./Suggestions";
// NEXT AUTH
import { useSession } from "next-auth/react";

function Feed() {
  const { data: session } = useSession();

  return (
    <main
      className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-7xl mx-auto mt-20 ${
        !session && "!grid-cols-1 !max-w-3xl"
      }`}
    >
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>

      <section className="hidden xl:inline-grid md:col-span-1">
        {session && (
          <div className="fixed">
            <ProfileCard />

            <Suggestions />
          </div>
        )}
      </section>
    </main>
  );
}

export default Feed;
