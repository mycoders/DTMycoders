"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import { AddCircleOutline } from "@mui/icons-material";
import Router, { useRouter } from "next/router";
import {
  useAddress,
  useContract,
  useContractRead,
  useSDK,
} from "@thirdweb-dev/react";
import DashboardCard from "@/components/DashboardCard";
import Skeleton from "@mui/material/Skeleton";
import { toast } from "react-toastify";

import dTrustAbi from "@/contracts/DTrust.json";
import { objectExistsInArray } from "@/utils/helpers";

export type Trust = {
  name: string;
  settlor: string;
  trustees: string[];
  beneficiaries: string[];
  dateCreated: string;
  startFeeTime: string;
  isRevoked: boolean;
  contractAddress?: string;
};

export default function Dashboard() {
  const address = useAddress();
  const sdk = useSDK();
  const [trustCards, setTrustCards] = useState<Trust[]>([]);
  const [trustAddresses, setTrustAddresses] = useState<string[]>([]);
  const [cardInfoLoading, setCardInfoLoading] = useState<boolean>(false);
  const router = useRouter();
  const { contract: DtrustFactoryContract } = useContract(
    process.env.NEXT_PUBLIC_DTRUST_FACTORY_ADDRESS
  );
  const [filteredTrustCards, setFilteredTrustCards] = useState<Trust[]>([]);
  const {
    data: DataDtrustFactoryContract,
    isLoading: isLoadingDtrustFactoryContract,
    isSuccess: isSuccessDtrustFactoryContract,
    refetch,
  } = useContractRead(DtrustFactoryContract, "getDTrustsByUser", [address]);
  const createTrustSuccess = router.query.createTrustSuccess;

  const getContractInfo = async (address: string) => {
    try {
      const contract = await sdk.getContract(address, dTrustAbi);
      const info = await contract.call("getTrustInfo");
      return info;
    } catch (error) {
      console.log(error.errorArgs[0], "error");
      throw error.errorArgs[0];
    }
  };
  useLayoutEffect(() => {
    if (trustCards.length > 0) {
      setCardInfoLoading(true);
      const sortedTrustCards = [...trustCards].sort((a, b) => {
        if (a.isRevoked && !b.isRevoked) return 1;
        if (!a.isRevoked && b.isRevoked) return -1;
        return (
          new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
        );
      });
      const nonRevokedCards = sortedTrustCards
        .filter((card) => !card.isRevoked)
        .reverse();
      const reversedTrustCards = sortedTrustCards.map((card) =>
        card.isRevoked ? card : nonRevokedCards.shift()!
      );
      setFilteredTrustCards(reversedTrustCards);
      setCardInfoLoading(false);
    }
  }, [trustCards]);

  useLayoutEffect(() => {
    if (trustAddresses.length > 0) {
      console.log("trustAddresses", trustAddresses);
      trustAddresses.map((trustAddress) => {
        console.log("trustAddress", trustAddress);
        getContractInfo(trustAddress)
          .then((info) => {
            if (info) {
              const trust: Trust = {
                name: info[0],
                settlor: info[1],
                trustees: info[2],
                beneficiaries: info[3],
                dateCreated: info[4],
                startFeeTime: info[5],
                isRevoked: info[6],
                contractAddress: trustAddress,
              };
              setTrustCards((prev) => {
                if (objectExistsInArray(trust, prev)) {
                  return prev;
                }
                return [...prev, trust];
              });
            }
          })
          .catch((error) => {
            console.log("error", error);
            if (error == "The contract has been revoked") {
              const trust: Trust = {
                name: "",
                settlor: "",
                trustees: [],
                beneficiaries: [],
                dateCreated: "",
                startFeeTime: "",
                isRevoked: true,
                contractAddress: trustAddress,
              };
              setTrustCards((prev) => {
                if (objectExistsInArray(trust, prev)) return prev;
                return [...prev, trust];
              });
            }
          });
      });
    }
  }, [trustAddresses]);

  useEffect(() => {
    if (isSuccessDtrustFactoryContract) {
      setTrustAddresses(DataDtrustFactoryContract);
    }
  }, [isSuccessDtrustFactoryContract, isLoadingDtrustFactoryContract]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, mt: 4 }}>
        <Typography variant="h4" component="h1">
          dtrusts
        </Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              height: "210px",
            }}
            onClick={() => router.push("/newDtrust")}
            className="cursor-pointer"
          >
            <CardHeader
              title="Create New dtrust"
              avatar={
                <AddCircleOutline fontSize="large" sx={{ color: "#FE7E34" }} />
              }
            />
          </Card>
        </Grid>
        {isLoadingDtrustFactoryContract &&
          [...Array(10)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Skeleton
                    animation="wave"
                    variant="rect"
                    width={210}
                    height={118}
                  />
                  <Skeleton
                    animation="wave"
                    height={10}
                    style={{ marginBottom: 6 }}
                  />
                  <Skeleton animation="wave" height={10} width="80%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        <>
          {filteredTrustCards.length > 0 &&
            filteredTrustCards.map((trustAddress, index) => (
              <DashboardCard
                trustInfo={trustAddress}
                userAddress={address}
                address={trustAddress.contractAddress!}
                contractRevoked={trustAddress.isRevoked}
                cardInfoLoading={cardInfoLoading}
                key={index}
              />
            ))}
        </>
      </Grid>
    </Container>
  );
}
