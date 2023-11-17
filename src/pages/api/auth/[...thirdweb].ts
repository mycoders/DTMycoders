import { ThirdwebAuth } from "@thirdweb-dev/auth/next";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";
import { serverClient } from "../../../../sanity/sanity-utils";

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: process.env.THIRDWEB_AUTH_DOMAIN ,
  wallet: new PrivateKeyWallet(process.env.THIRDWEB_AUTH_PRIVATE_KEY || ""),
  authOptions: {
    refreshIntervalInSeconds: 60 * 60, // 1 hour
  },
  callbacks: {
    onLogin: async (address) => {
      let user = await serverClient.fetch(`*[_type == "users" && walletAddress == "${address}"]`);
      if (user.length > 0) {
        return user[0];
      }
      const newDBUser={
        _type:"users",
        walletAddress:address
      }
      user = await serverClient.create(newDBUser);
      return user;
    },
    onUser: async (user) => {
      console.log(user,"user from onUser")
      const dbUser = await serverClient.fetch(`*[_type == "users" && walletAddress == "${user.address}"]`);
console.log(dbUser,"dbUser from onUser")
      return dbUser;
    },
    onLogout: async (user) => {
      
    },
  },

});

export default ThirdwebAuthHandler();

