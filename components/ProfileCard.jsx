// NEXT AUTH
import { signOut, useSession } from "next-auth/react";

function ProfileCard() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between mt-12 ml-10">
      <img
        src={session?.user?.image}
        className="w-16 h-16 rounded-full border p-[2px] object-cover mr-4"
        alt="user-avatar"
      />

      <div className="mr-8">
        <h2 className="font-bold">{session?.user.username}</h2>
        <h3 className="text-gray-400 text-sm">Welcome to Instagram</h3>
      </div>

      {/* NEXT-AUTH SIGNOUT */}
      <button
        className="px-2 py-1 text-blue-500 hover:bg-blue-500 hover:text-white hover:transition-all hover:rounded-lg cursor-pointer"
        onClick={signOut}
      >
        Sign out
      </button>
    </div>
  );
}

export default ProfileCard;
