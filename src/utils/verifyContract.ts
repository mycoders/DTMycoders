import { Etherscan } from "@nomicfoundation/hardhat-verify/etherscan";
import { ethers } from "ethers";
import DTrustCode from "@/contracts/build-info/Dtrust.json";

const verifyContract = async (contractAddress: string, args: any) => {

    const abi = ethers.utils.defaultAbiCoder;
    const params = abi.encode(
        ["string", "address", "address", "address[]", "address[]", "address[]"], // encode as address array
        [...args]);

    console.log(params);

    // const instance = new Etherscan(
    //     "BDXPDXNPD3111WPETE1NNSHIK2YGWWYPBP", // Etherscan API key
    //     "https://api-sepolia.etherscan.io/api", // Etherscan API URL
    //     "https://sepolia.etherscan.io/" // Etherscan browser URL
    //   );

    //   if (!instance.isVerified(contractAddress)) {
    //     const { message: guid } = await instance.verify(
    //       // Contract address
    //       contractAddress,
    //       // Contract source code
    //       `${DTrustCode}`,
    //       // Contract name
    //       "contracts/DTrustV1.sol:DTRUST",
    //       // Compiler version
    //       "v0.8.17",
    //       // Encoded constructor arguments
    //       "0000000000000000000000000000000000000000000000000000000000000032"
    //     );
      
    //     await sleep(1000);
    //     const verificationStatus = await instance.getVerificationStatus(guid);
      
    //     if (verificationStatus.isSuccess()) {
    //       const contractURL = instance.getContractUrl(contractAddress);
    //       console.log(
    //         `Successfully verified contract "MyContract" on Etherscan: ${contractURL}`
    //       );
    //       return contractURL;
    //     }
    //   }



}