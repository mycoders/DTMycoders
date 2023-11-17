import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  Container,
  IconButton,
  Tabs,
  Tab,
  Button,
  Box,
  Modal,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import TrustInfo from "@/components/TrustInfo";
import { getEllipsisTxt } from "@/utils/helpers";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Sepolia } from "@thirdweb-dev/chains";
import dTrustAbi from "@/contracts/DTrust.json";
import { Grid, Card, CardHeader, CardContent, Typography } from "@mui/material";
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useSigner } from "@thirdweb-dev/react";
import { toast } from "react-toastify";
import Link from "next/link";
import TrustBalance, { mainGetTokenBlances } from "@/components/TrustBalance";
import TrustDeposit from "@/components/TrustDeposit";
import TrustRevoke from "@/components/TrustRevoke";
import TrustPayout from "@/components/TrustPayout";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

function TrustDetail({ slug }) {
  const userAddress = useAddress();
  const [trustInfo, setTrustInfo] = useState<[]>();
  const { contract } = useContract(slug, dTrustAbi);
  const { data: info, refetch } = useContractRead(contract, "getTrustInfo");
  const [contractBalances, setContractBalances] = useState<any[]>([]);
  const [contractBalanceLoading, setContractBalanceLoading] =
    useState<boolean>(false);
  const getTokenBalances = async () => {
    setContractBalanceLoading(true);
    const balances = await mainGetTokenBlances(slug);
    setContractBalances(balances);
    setContractBalanceLoading(false);
  };
  useEffect(() => {
    if (info) {
      setTrustInfo(info);
    }
  }, [info]);

  const getUserRole = () => {
    if (!trustInfo || trustInfo.length === 0) return;
    if (userAddress === trustInfo[1]) {
      return "Settlor";
    } else if (trustInfo[2]?.includes(userAddress)) {
      return "Trustee";
    } else if (trustInfo[3]?.includes(userAddress)) {
      return "Beneficiary";
    }
    return "";
  };

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handlePayout = () => {
    console.log("Payout executed");
  };

  const handleDeposit = () => {
    toast.success("Funds deposit coming soon");
    console.log("Funds deposited");
  };

  return (
    <Container className="h-full">
      <div className="flex items-center ">
        <Link href="/dashboard" prefetch>
          <ArrowBackIcon className="mr-4 " color="primary" />
        </Link>
        <div>
          <h1 className="m-0 p-0 mt-4">{trustInfo && trustInfo[0]}</h1>
          <p className="m-0 p-0 ">{getEllipsisTxt(slug, 10)}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid auto-rows-max gap-6">
          <TrustBalance
            slug={slug}
            contractBalances={contractBalances}
            getTokenBalances={getTokenBalances}
            contractBalanceLoading={contractBalanceLoading}
          />
          <TrustInfo
            settlor={trustInfo && trustInfo[1]}
            trustees={trustInfo && trustInfo[2]}
            beneficiaries={trustInfo && trustInfo[3]}
          />
        </div>
        <div className="actions">
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="fullWidth"
            aria-label="Trust Actions"
          >
            <Tab label="Deposit Funds" />
            <Tab label="Payout" />
            <Tab label="Revoke Dtrust" />
          </Tabs>

          {selectedTab === 2 && <TrustRevoke slug={slug} />}

          {selectedTab === 1 && (
            <TrustPayout
              beneficiaries={trustInfo && trustInfo[3]}
              contractBalances={contractBalances}
              trustees={trustInfo && trustInfo[2]}
              slug={slug}
              getTokenBalances={getTokenBalances}
            />
          )}

          {selectedTab === 0 && (
            <TrustDeposit
              slug={slug}
              contract={contract}
              refetch={getTokenBalances}
            />
          )}
        </div>
      </div>
    </Container>
  );
}

TrustDetail.getInitialProps = ({ query }) => {
  return { slug: query.slug };
};

export default TrustDetail;
