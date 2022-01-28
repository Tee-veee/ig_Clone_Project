import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import "../styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </RecoilRoot>
  );
}
