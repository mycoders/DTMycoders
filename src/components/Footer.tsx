import React from "react";
import {
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  Telegram as TelegramIcon,
} from "@mui/icons-material";
import Link from "next/link";
type Props = {};

const Footer = (props: Props) => {
  return (
    <> 
      <div className="flex justify-center items-center w-full p-20">
        <div className="flex flex-col justify-around items-center">
          <h2 className="font-medium shadow-md text-2xl">
            DTrust is about solving legal problems with technology.
          </h2>
          <Link href="mailto:david@dtrust.io">
            <button className=" bg-white border-4  px-8 py-3 w-48 font-semibold rounded-none hover:bg-opacity-90 border-[#fe8d4a] mt-5 text-[#fe8d4a]">
              Contact
            </button>
          </Link>
          <div className="w-full lg:w-1/2 flex justify-center space-x-4 mt-10 lg:mt-0">
            <Link
              href="https://twitter.com/dtrust_io"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/icons8-twitterx.svg"
                className=" h-10 w-10 m-3 "
                alt="x"
              />
              {/* <TwitterIcon className="text-[#fe8d4a]   p-3 m-3 text-5xl" /> */}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
