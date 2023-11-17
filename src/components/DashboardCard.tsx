import { getEllipsisTxt } from "@/utils/helpers";
import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Link,
  Skeleton,
} from "@mui/material";
import { useRouter } from "next/router";
import moment from "moment";
import { toast } from "react-toastify";
import { Trust } from "@/pages/dashboard";

type DashboardCardProps = {
  trustInfo: Trust | undefined;
  cardInfoLoading: boolean;
  contractRevoked: boolean;
  address: string;
  userAddress: string;
};

const DashboardCard = ({
  trustInfo,
  cardInfoLoading,
  contractRevoked,
  address,
  userAddress,
}: DashboardCardProps) => {
  const router = useRouter();

  const getUserRole = () => {
    if (!trustInfo) return;
    if (userAddress === trustInfo.settlor) {
      return "Settlor";
    } else if (trustInfo.trustees?.includes(userAddress)) {
      return "Trustee";
    } else if (trustInfo.beneficiaries?.includes(userAddress)) {
      return "Beneficiary";
    }
    return "";
  };

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
  };

  console.log(contractRevoked, "trustInfo");
  return (
    <>
      {trustInfo && !contractRevoked && (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          onClick={() => router.push(`/dtrust/${address}`)}
          className="pointer-events-auto"
        >
          {cardInfoLoading ? (
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
          ) : (
            <Card
              className="cursor-pointer"
              sx={{
                height: "210px",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)", // Change background color on hover
                  transform: "scale(1.05)", // Slightly scale the card up on hover
                },
              }}
            >
              <CardHeader
                title={trustInfo.name}
                subheader={`Created at "${moment(
                  new Date(trustInfo.dateCreated?._hex * 1000)
                ).format("MMMM Do YYYY")}"`}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Settlor: {getEllipsisTxt(trustInfo.settlor)}
                </Typography>
                <Link
                  target="_blank"
                  href={`${process.env.NEXT_PUBLIC_BLOCKCHAIN_EXPLORER_URL}${address}`}
                  onClick={handleLinkClick}
                >
                  <Typography variant="body2" color="text.secondary">
                    See dtrust On Eth Explorer
                  </Typography>
                </Link>

                <Typography variant="body2" color="text.secondary">
                  Role: {getUserRole()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status: {contractRevoked ? "Revoked" : "Active"}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      )}
      {contractRevoked && (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          onClick={() => toast.error("Contract is revoked")}
          className="pointer-events-auto"
        >
          <Card
            sx={{
              height: "210px",
            }}
            disabled={true}
            className="cursor-pointer"
          >
            <CardHeader
              title={getEllipsisTxt(address)}
              subheader={`dtrust Has Been Revoked`}
            />
            <CardContent>
              <Link
                target="_blank"
                href={`${process.env.NEXT_PUBLIC_BLOCKCHAIN_EXPLORER_URL}${address}`}
                onClick={handleLinkClick}
              >
                <Typography variant="body2" color="text.secondary">
                  See dtrust On Eth Explorer
                </Typography>
              </Link>
              <Typography variant="body2" color="text.secondary">
                Status: Revoked
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
    </>
  );
};

export default DashboardCard;
