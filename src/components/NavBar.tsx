"use client";
import {
  ConnectWallet,
  useAddress,
  useConnectionStatus,
  useLogout,
  useNetworkMismatch,
  useUser,
  useWallet,
} from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useLayoutEffect } from "react";
import { useLogin } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { client, getWalletUserSanity } from "../../sanity/sanity-utils";
import { useSwitchChain } from "@thirdweb-dev/react";

type Props = {};

const NavBar = (props: Props) => {
  const walletInstance = useWallet();
  const [user, setUser] = React.useState(null);
  const address = useAddress();
  const { logout, isLoading } = useLogout();
  const { isLoggedIn } = useUser();
  const connectionStatus = useConnectionStatus();
  const isValidConnection = () => connectionStatus == "connected";
  const switchChain = useSwitchChain();
  const isMismatched = useNetworkMismatch(); // Detect if user is connected to the wrong network
  const updateUserState = async () => {
    if (address) {
      try {
        let res = await getWalletUserSanity(address);
        setUser(res[0]);
      } catch (error) {}
    }
  };

  useEffect(() => {
    updateUserState();
    // Check if the user is connected to the wrong network
    if (isMismatched) {
      // Prompt their wallet to switch networks
      switchChain(process.env.NEXT_PUBLIC_COINS_OPTIONS_CHAIN); // the chain you want here
    }
  }, [address]);
  console.log(user, "user navbar");
  console.log(address, "address navbar");

  const router = useRouter();
  return (
    <div className="bg-[#FE7E34] flex justify-between items-center flex-wrap min-h-[64px] flex-col md:flex-row">
      <div
        className=" flex items-center  text-white text-xl p-4 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <img src="/favicon.ico" alt="logo" width="30" height="30" />
        &nbsp;DTrust
      </div>
      <ul className="flex justify-evenly w-1/3 ">
        <li className=" list-none">
          <Link
            href="https://dtrust.notion.site/Docs-4264b09c1b1f4a028a7d069c62e1ea47"
            className="no-underline text-white"
          >
            Docs
          </Link>
        </li>
        <li className=" list-none">
          <Link
            className="no-underline text-white"
            href="https://dtrust.notion.site/Legal-c70f0ca35b584e9a96a4c1767c73aa95"
          >
            Legal
          </Link>
        </li>
      </ul>

      <div className="p-3 md:p-6 flex">
        {isLoggedIn && user?.isApproved && isValidConnection() && (
          <button
            onClick={() => router.push("/dashboard")}
            className="cursor-pointer"
            style={{
              backgroundColor: "#fe8d4a",
              color: "white",
              padding: "10px 15px 10px 15px ",
              borderRadius: "30px",
              border: "1px solid white",
              maxHeight: "38px",
              marginRight: "10px",
            }}
          >
            Dashboard
          </button>
        )}
        {isLoggedIn && !user?.isApproved && isValidConnection() && (
          <button
            onClick={() => router.push("/signup")}
            className="cursor-pointer"
            style={{
              backgroundColor: "#fe8d4a",
              color: "white",
              padding: "10px 15px 10px 15px ",
              borderRadius: "30px",
              border: "1px solid white",
              maxHeight: "38px",
              marginRight: "10px",
            }}
          >
            SignUp
          </button>
        )}
        <ConnectWallet
          btnTitle="Connect Wallet"
          auth={{
            onLogin(code) {
              console.log(code, "jwtcode login");
              router.push("/signup");
            },
            onLogout() {
              router.push("/");
            },
          }}
          style={{
            backgroundColor: "#fe8d4a",
            color: "white",
            padding: "10px  10px ",
            borderRadius: "30px",
            border: "1px solid white",
            maxHeight: "38px",
          }}
        />
      </div>
    </div>
  );
};

export default NavBar;
