import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button, Box, CircularProgress } from "@mui/material";
import { utils } from "ethers";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
  useSDK,
  useBalance,
} from "@thirdweb-dev/react";
import { toast } from "react-toastify";
import { getTopCoins } from "@/utils/helpers";

interface TrustDepositProps {
  contract: any;
  slug: string;
  refetch: any;
}

const TrustDeposit: React.FC<TrustDepositProps> = ({
  contract,
  slug,
  refetch,
}) => {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [balance, setBalance] = useState(undefined);
  const [allowance, setAllowance] = useState(undefined);
  const { data: ethBalance } = useBalance(NATIVE_TOKEN_ADDRESS);
  const [disableApprove, setDisableApprove] = useState(true);
  const [disableDeposit, setDisableDeposit] = useState(true);
  const [depositAmount, setDepositAmount] = useState(null);
  const [depositAmountError, setDepositAmountError] = useState<string | null>(
    null
  );
  const [approveLoading, setApproveLoading] = useState(false);
  const [walletInfoLoading, setWalletInfoLoading] = useState(false);
  const {
    mutateAsync: contractDeposit,
    isLoading,
    error,
  } = useContractWrite(contract, "depositToken");
  const { mutateAsync: contractDepositEth, isLoading: depositEthLoading } =
    useContractWrite(contract, "depositEth");
  const sdk = useSDK();

  useEffect(() => {
    if (selectedCoin && disableApprove) {
      setDisableApprove(false);
    }
  }, [selectedCoin]);

  useEffect(() => {
    getWalletInfo();
  }, [selectedCoin]);

  useEffect(() => {
    if (allowance) {
      depostAmountOnChange(depositAmount);
    }
  }, [allowance]);

  const getWalletInfo = async () => {
    if (selectedCoin) {
      if (selectedCoin.contractAddress) {
        setWalletInfoLoading(true);
        const contract = await sdk.getContract(selectedCoin.contractAddress);
        const allowance = await contract.erc20.allowance(slug);
        const balance = await contract.erc20.balance();
        setAllowance(allowance);
        setDisableDeposit(false);
        setBalance(balance);
        setWalletInfoLoading(false);
      } else {
        setWalletInfoLoading(true);
        setBalance(ethBalance);
        setWalletInfoLoading(false);
        setDisableDeposit(false);
      }
    }
  };

  const approve = async () => {
    try {
      setApproveLoading(true);
      const contract = await sdk.getContract(selectedCoin.contractAddress);
      const receipt = await contract.erc20.setAllowance(slug, depositAmount);
      setApproveLoading(false);
      getWalletInfo();
    } catch (error) {
      console.log(error);
      toast.error(error.reason);
      setApproveLoading(false);
    }
  };

  const depositFunds = async () => {
    if (selectedCoin && depositAmount) {
      if (selectedCoin.symbol == "ETH") {
        try {
          toast.info("Depositing ETH");
          const receipt = await contractDepositEth({
            overrides: {
              value: utils.parseEther(depositAmount),
            },
          });
          refetch();
          getWalletInfo();
          toast.success("ETH deposited");
          console.log(receipt);
          return;
        } catch (error) {
          toast.error(error.reason);
          console.log(error);
        }
      } else {
        try {
          toast.info("Depositing ERC20 TOKEN");
          const contract = await sdk.getContract(selectedCoin.contractAddress);
          const amount = await contract.erc20.normalizeAmount(depositAmount);
          const receipt = await contractDeposit({
            args: [selectedCoin.contractAddress, amount],
          });
          refetch();
          getWalletInfo();
          toast.success("ERC20 TOKEN deposited");
          console.log(receipt);
        } catch (error) {
          toast.error(error.reason);
          console.log(error);
        }
      }
    } else {
      toast.error("Please select a coin and amount to deposit");
    }
  };

  const depostAmountOnChange = (amount) => {
    setDepositAmount(amount);
  };

  const approveDisabled = () => {
    if (!depositAmount || +depositAmount == 0 || disableApprove) {
      return true;
    }

    if (selectedCoin && selectedCoin.symbol !== "ETH") {
      if (balance && +depositAmount > +balance.displayValue) {
        return true;
      }
      if (allowance && +depositAmount <= +allowance.displayValue) {
        return true;
      }
    } else {
      return true;
    }

    return false;
  };

  const depositDisabled = () => {
    if (!depositAmount || +depositAmount == 0) {
      return true;
    }

    if (selectedCoin && selectedCoin.symbol == "ETH") {
      if (balance && +depositAmount > +balance.displayValue) {
        return true;
      }
    } else {
      if (allowance && +depositAmount > +allowance.displayValue) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <Box
        className="flex flex-col justify-around items-center  gap-4 mt-10"
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "300px",
        }}
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          className="w-full"
          onChange={(event, value) => setSelectedCoin(value)}
          options={getTopCoins(process.env.NEXT_PUBLIC_COINS_OPTIONS_CHAIN)}
          renderInput={(params) => (
            <TextField {...params} label="Select Coin" />
          )}
        />
        <OutlinedInput
          id="outlined-adornment-amount"
          placeholder="amount"
          type="number"
          disabled={disableDeposit}
          className="w-full"
          inputProps={{ max: 20, min: 0 }}
          onChange={(e) => depostAmountOnChange(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              {selectedCoin && selectedCoin.symbol}
            </InputAdornment>
          }
        />
        {depositAmountError && (
          <p className="text-red-600 p-0 m-0">
            {depositAmountError}
            {allowance &&
              depositAmount &&
              selectedCoin?.symbol != "ETH" &&
              allowance.displayValue < depositAmount &&
              "You did not approve enough tokens"}
          </p>
        )}

        <p className="text-gray-700 p-0 m-0">
          {depositAmount &&
            +depositAmount > +balance.displayValue &&
            "You do not have enough funds in your wallet"}
          {allowance &&
            depositAmount &&
            selectedCoin?.symbol != "ETH" &&
            +allowance?.displayValue < +depositAmount &&
            `Approve ${depositAmount} ${selectedCoin?.symbol} to deposit`}
        </p>
        {walletInfoLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          <>
            {selectedCoin && balance && (
              <Stack spacing={1}>
                <Item>
                  Your Balance: {balance.displayValue} {balance?.symbol}
                </Item>
                {allowance &&
                  selectedCoin &&
                  selectedCoin?.symbol !== "ETH" && (
                    <Item>
                      Approved: {allowance?.displayValue} {allowance?.symbol}
                    </Item>
                  )}
              </Stack>
            )}
          </>
        )}

        <Button
          disabled={approveLoading || approveDisabled()}
          onClick={approve}
          variant="contained"
          color="primary"
          className={`text-white w-full font-bold ${
            selectedCoin && selectedCoin.symbol == "ETH" ? "hidden" : "block"
          } `}
        >
          {approveLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Approve"
          )}
        </Button>
        <Button
          onClick={depositFunds}
          disabled={depositDisabled() || isLoading || depositEthLoading}
          variant="contained"
          color="primary"
          className="text-white w-full font-bold"
        >
          {isLoading || depositEthLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Deposit"
          )}
        </Button>
      </Box>
    </>
  );
};

export default TrustDeposit;
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
