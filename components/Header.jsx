// IMAGES
import Image from "next/image";
import igLogo from "../assets/igLogo.svg";
// ICONS
import {
  FaSearch,
  FaHome,
  FaPlusCircle,
  FaUserFriends,
  FaHeart,
  FaTelegramPlane,
} from "react-icons/fa";
// NEXT-AUTH
import { useSession, signIn, signOut } from "next-auth/react";
// ROUTER
import { useRouter } from "next/router";
// RECOIL
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();

  return (
    <div className="fixed w-full top-0 px-4 bg-white py-2 flex items-center justify-between shadow-lg z-10">
      {/* LEFT DIV */}
      <div className="flex items-center" onClick={() => router.push("/")}>
        <Image
          src={igLogo}
          width={60}
          height={60}
          alt="logo"
          layout="fixed"
          className="cursor-pointer"
          priority
        />
      </div>
      {/* CENTER DIV */}

      <div className="flex justify-center flex-grow space-x-4 md:space-x-12">
        <div className="flex w-9/12 md:w-6/12 xl:w-4/12 border rounded-full relative  bg-gray-100 ">
          <FaSearch className="h-5 w-5 absolute left-3 top-[6px] md:hover:scale-90 md:hover:transition-all cursor-pointer" />
          <input
            type="text"
            placeholder="Search Instagram"
            className=" pl-10 text-md outline-none border-none bg-transparent p-1 focus:shadow-lg focus:transition-all rounded-full w-full"
          />
        </div>
      </div>

      {/* RIGHT DIV */}
      <div className="hidden md:inline-flex items-center sm-space:x-2 justify-end space-x-4">
        {/* <Image /> */}
        <FaHome
          className="text-2xl  hover:scale-90 hover:transition-all cursor-pointer"
          onClick={() => router.push("/")}
        />
        {session ? (
          <>
            <div className="relative">
              <FaTelegramPlane className="text-2xl  hover:scale-90 hover:transition-all cursor-pointer " />
              <div className="absolute -right-2 -top-2 h-4 w-4 rounded-full flex items-center justify-center bg-red-500">
                <p className="text-sm text-white">3</p>
              </div>
            </div>
            <FaPlusCircle
              onClick={() => setOpen(true)}
              className="text-2xl  hover:scale-90 hover:transition-all cursor-pointer "
            />
            <FaUserFriends className="text-2xl  hover:scale-90 hover:transition-all cursor-pointer" />
            <FaHeart className="text-2xl  hover:scale-90 hover:transition-all cursor-pointer" />
            <img
              src={session?.user?.image}
              className="h-12 w-12 rounded-full bg-pink-500 cursor-pointer  hover:scale-90 hover:transition-all hover:shadow-2xl"
              alt="user-avatar"
              onClick={signOut}
            />
          </>
        ) : (
          <button
            className="px-2 py-1 text-blue-500 hover:bg-blue-500 hover:text-white hover:transition-all hover:rounded-lg cursor-pointer"
            onClick={signIn}
          >
            Sign in
          </button>
        )}
      </div>
      {session ? (
        <img
          src={session?.user?.image}
          className="md:hidden h-12 w-12 rounded-full bg-pink-500 cursor-pointer  hover:scale-90 hover:transition-all hover:shadow-2xl"
          alt="user-avatar"
          onClick={signOut}
        />
      ) : (
        <div className="flex items-center ">
          <FaHome
            className="md:hidden text-2xl  hover:scale-90 hover:transition-all cursor-pointer mr-2"
            onClick={() => router.push("/")}
          />
          <button
            className="md:hidden px-2 py-1 text-blue-500 hover:bg-blue-500 hover:text-white hover:transition-all hover:rounded-lg cursor-pointer"
            onClick={signIn}
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
