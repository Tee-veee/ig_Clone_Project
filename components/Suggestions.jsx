// REACT
import { useState, useEffect } from "react";
// FAKER
import faker from "@faker-js/faker";
function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));

    setSuggestions(suggestions);
  }, []);

  return (
    <div className="ml-10 mt-4">
      <div className="flex items-center justify-between text-sm mb-12 mt-8">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="">See All</button>
      </div>

      {suggestions?.map((profile) => (
        <div className="flex items-center  mt-3" key={profile.id}>
          <img
            src={profile.avatar}
            className="w-10 h-10 object-cover rounded-full mr-4"
            alt="user-avatar"
          />

          <div className="flex-1">
            <h2 className="font-semibold text-sm">{profile.username}</h2>
            <h3 className="text-gray-400 max-w-[200px] truncate">
              Works at {profile.company.name}
            </h3>
          </div>

          <div>
            <button className="text-sm text-blue-500">Follow</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Suggestions;
