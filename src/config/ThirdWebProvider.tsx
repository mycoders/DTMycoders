"use client";

import {
  metamaskWallet,
  ThirdwebProvider,
  smartWallet,
  coinbaseWallet,
  localWallet,
  magicLink,
  walletConnect,
  trustWallet,
} from "@thirdweb-dev/react";
import { Sepolia, Ethereum } from "@thirdweb-dev/chains";

const metamaskConfig = metamaskWallet();
const coinbaseConfig = coinbaseWallet();
const walletConnectConfig = walletConnect({
  projectId: process.env.walletConnectProjectId,
});
const trustWalletConfig = trustWallet({
  projectId: process.env.trustWalletProjectId,
});

type Web3ProviderProps = {
  children: React.ReactNode;
};

const ThirdWebProvider = ({ children }: Web3ProviderProps) => {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_SDK_CLIENT_ID}
      supportedWallets={[
        metamaskConfig,
        coinbaseConfig,
        walletConnectConfig,
        trustWalletConfig,
      ]}
      authConfig={{
        // This domain should match the backend
        // Pass the  of the auth endpoints
        domain: process.env.THIRDWEB_AUTH_DOMAIN || "http://localhost:3000",
        authUrl: "/api/auth",
      }}
      supportedChains={[Sepolia, Ethereum]}
      activeChain={
        process.env.NEXT_PUBLIC_THIRDWEB_SDK_ACTIVE_CHAIN === "Sepolia"
          ? Sepolia
          : Ethereum
      }
      secretKey={process.env.NEXT_PUBLIC_THIRDWEB_SDK_SECRET_KEY}
    >
      {children}
    </ThirdwebProvider>
  );
};
export default ThirdWebProvider;
