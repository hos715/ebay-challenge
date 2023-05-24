import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Mumbai, Ethereum } from "@thirdweb-dev/chains";

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import network from "@/utils/network";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      autoConnect={true}
      activeChain={network}
      supportedChains={[Ethereum, Mumbai]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
