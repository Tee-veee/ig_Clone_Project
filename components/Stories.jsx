// FAKER
import faker from "@faker-js/faker";
// REACT
import { useEffect, useState } from "react";
// COMP
import Story from "./Story";
// NEXT AUTH
import { useSession } from "next-auth/react";

function Stories() {
  const [suggestions, setSuggestions] = useState([]);
  const { data: session } = useSession();
  // GEN FAKE USER DATA
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);

  return (
    <div
      className="flex w-full space-x-2 p-6 mt-8 border-gray-300 overflow-x-scroll rounded-lg bg-gray-100"
      id="story-div"
    >
      {session && (
        <Story img={session?.user?.image} username={session?.user?.username} />
      )}
      {suggestions?.map((profile) => {
        return (
          <Story
            img={profile.avatar}
            profilename={profile.username}
            key={profile.id}
          />
        );
      })}
    </div>
  );
}

export default Stories;
