import { getProviders, signIn as signInWithProvider } from "next-auth/react";

import Header from "../../components/Header";

function signIn({ providers }) {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center w-full h-screen bg-gray-200 ">
        {Object.values(providers).map((provider) => (
          <div
            key={provider.name}
            className=" relative px-12 w-fit h-[300px] bg-white flex flex-col items-center justify-center hover:shadow-xl hover:transition-all"
          >
            <h1 className="mb-8 text-2xl">
              Welcome to my instagram_Clone_Project
            </h1>
            <button
              onClick={() =>
                signInWithProvider(provider.id, { callbackUrl: `${"/"}` })
              }
              className="p-4 bg-blue-500 text-white rounded-lg hover:scale-95 hover:transition-all"
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default signIn;
