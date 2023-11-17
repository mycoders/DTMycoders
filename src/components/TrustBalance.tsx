import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Alchemy, Network, Utils } from "alchemy-sdk";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Skeleton,
} from "@mui/material";

const config = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_SDK_KEY,
  network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(config);
export const mainGetTokenBlances = async (address) => {
  let tokenData = [];

  // Get token balances
  const balances = await alchemy.core.getTokenBalances(address);

  // Remove tokens with zero balance
  const nonZeroBalances = balances.tokenBalances.filter((token) => {
    return token.tokenBalance !== "0";
  });
  let ethBalance = await alchemy.core.getBalance(address, "latest");
  ethBalance = Utils.formatEther(ethBalance);
  tokenData.push({
    name: "Ether",
    balance: ethBalance,
    symbol: "ETH",
  });
  console.log(`Token balances of ${address} \n`);
  console.log(nonZeroBalances, "nonZeroBalances");
  // Counter for SNo of final output
  let i = 1;
  // Loop through all tokens with non-zero balance
  for (let token of nonZeroBalances) {
    // Get balance of token
    let balance = token.tokenBalance;

    // Get metadata of token
    const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);

    // Compute token balance in human-readable format
    balance = balance / Math.pow(10, metadata.decimals);
    balance = balance.toFixed(2);

    // Print name, balance, and symbol of token
    console.log(`${i++}. ${metadata.name}: ${balance} ${metadata.symbol}`);
    // push the data to an array of objects
    tokenData.push({
      name: metadata.name,
      balance: balance,
      symbol: metadata.symbol,
    });
  }
  console.log(tokenData, "tokenData");
  return tokenData;
};

type Slug = {
  slug: string;
  contractBalances: any[];
  getTokenBalances: () => void;
  contractBalanceLoading: boolean;
};
const TrustBalance = ({
  slug,
  contractBalances,
  getTokenBalances,
  contractBalanceLoading,
}: Slug) => {
  useEffect(() => {
    getTokenBalances();
  }, []);
  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold text-gray-900 ">
        dtrust Balance
      </h2>

      <TableContainer sx={{ minWidth: 400 }} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Coins</TableCell>
              <TableCell align="right">Symbol</TableCell>
              <TableCell align="right">Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contractBalanceLoading // Check if loading is true, display skeletons
              ? // Display skeleton rows for a placeholder effect
                [1, 2, 3].map((index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton animation="wave" height={20} width={100} />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton animation="wave" height={20} width={50} />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton animation="wave" height={20} width={50} />
                    </TableCell>
                  </TableRow>
                ))
              : // When not loading, display contractBalances
                contractBalances &&
                contractBalances.map((token) => (
                  <TableRow key={token.name}>
                    <TableCell>
                      <span className="font-bold"> {token.name} </span>
                    </TableCell>
                    <TableCell align="right">{token.symbol}</TableCell>
                    <TableCell align="right">{token.balance}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TrustBalance;
