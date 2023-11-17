import React, { useEffect } from "react";
import {
  Box,
  Autocomplete,
  TextField,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
  useSDK,
} from "@thirdweb-dev/react";

import {
  convertPayoutFormat,
  getBenefeciariesAutoComplete,
  getEllipsisTxt,
} from "@/utils/helpers";
import { DevTool } from "@hookform/devtools";
import dTrustAbi from "@/contracts/DTrust.json";
import { toast } from "react-toastify";
import { utils } from "ethers";
import { CircularProgress } from "@mui/material";

// Validation Schema using Yup
const schema = yup.object().shape({
  beneficiary: yup
    .object()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    })
    .nullable()
    .required("Beneficiary is required"),

  coin: yup
    .object()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    })
    .nullable()
    .required("Coin selection is required")
    .test(
      "has-balance",
      "Selected coin must have a balance greater than 0",
      (value) => parseFloat(value?.balance || 0) > 0
    ),

  amount: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    })
    .min(0)
    .max(
      yup.ref("coin.balance"),
      `Amount should not be greater then coin balance.`
    )
    .nullable() // allow null value for the transformation above
    .required("Amount is required"),
});

type props = {
  beneficiaries: any[];
  contractBalances: any[];
  slug: string;
  getTokenBalances: () => void;
  trustees: any[];
};

const TrustPayout = ({
  beneficiaries,
  trustees,
  contractBalances,
  slug,
  getTokenBalances,
}: props) => {
  const sdk = useSDK();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const address = useAddress();
  const { contract } = useContract(slug, dTrustAbi);
  const [canPayout, setCanPayout] = React.useState<boolean>(false);
  const { data: canRevoke } = useContractRead(contract, "revokeAddressLookup", [
    address,
  ]);
  const { mutateAsync, isLoading, error } = useContractWrite(
    contract,
    "payout"
  );
  const {
    mutateAsync: payoutEth,
    isLoading: isLoadingEth,
    error: errorEth,
  } = useContractWrite(contract, "payoutEth");
  console.log(trustees, "trustees");

  const checkIfTrustee = () => {
    return trustees.includes(address);
  };
  useEffect(() => {
    setCanPayout(checkIfTrustee());
  }, [trustees]);
  const selectedCoin = watch("coin");
  const onSubmit = async (data) => {
    console.log(data.coin.label);
    if (data.coin.label === "Ether") {
      try {
        const res = await payoutEth({
          args: [
            utils.parseEther(String(data.amount)),
            data.beneficiary["label"],
          ],
        });
        toast.success("Payout Successful");
        getTokenBalances();

        console.log(res);
      } catch (err) {
        console.log(err);
        toast.error(err.reason);
      }
    } else {
      console.log("ERC20 Payout");
      try {
        const coinContract = await sdk.getContract(data.coin.contractAddress);
        const amount = await coinContract.erc20.normalizeAmount(data.amount);

        const res = await mutateAsync({
          args: [data.coin.contractAddress, amount, data.beneficiary["label"]],
        });
        toast.success("Payout Successful");
        getTokenBalances();
        console.log(res);
      } catch (err) {
        console.log(err);
        toast.error(err.reason);
      }
    }
  };
  const onInvalid = (data) => {
    console.log(data);
    toast.error("Please fill all the required fields");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <Box
        className="flex flex-col justify-around items-center gap-4 mt-10"
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "300px",
        }}
      >
        {!canPayout && (
          <p className="text-red-400 font-bold">
            You don’t have permission to payout, because you are not the trustee
          </p>
        )}

        <Controller
          name="beneficiary"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Autocomplete
              disablePortal
              id="combo-box-demo-beneficiary"
              value={value}
              options={getBenefeciariesAutoComplete(beneficiaries)}
              className="w-full"
              renderInput={(params) => (
                <TextField {...params} label="Select Beneficiary" />
              )}
              renderOption={(props, option: any) => (
                <li {...props}>
                  <span style={{ fontSize: "1rem", color: "#888" }}>
                    {getEllipsisTxt(option.label, 14)}
                  </span>
                </li>
              )}
              onChange={(e, data) => {
                setValue("beneficiary", data);
                onChange(data);
              }}
            />
          )}
        />
        {errors.beneficiary && (
          <p className="text-red-400 p-0 m-0">{errors.beneficiary.message}</p>
        )}
        <Controller
          name="coin"
          control={control}
          defaultValue=""
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Autocomplete
              disablePortal
              value={value}
              id="combo-box-demo-coin"
              isOptionEqualToValue={(option: any, value: any) =>
                option.label === value.label
              }
              options={convertPayoutFormat(
                contractBalances,
                process.env.NEXT_PUBLIC_COINS_OPTIONS_CHAIN
              )}
              className="w-full"
              getOptionLabel={(option) => (option ? `${option.label} ` : "")}
              renderInput={(params) => (
                <TextField {...params} label="Select Coin" />
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  <span style={{ fontSize: "1rem", color: "#888" }}>
                    {option.label} - {option.balance}
                  </span>
                </li>
              )}
              onChange={(e, data) => {
                setValue("coin", data);
                onChange(data);
              }}
            />
          )}
        />
        {errors.coin && (
          <p className="text-red-400 p-0 m-0">{errors.coin.message}</p>
        )}

        <OutlinedInput
          {...register("amount")}
          placeholder="amount"
          type="number"
          className="w-full"
          inputProps={{ step: "any" }}
          startAdornment={
            <InputAdornment position="start">
              {selectedCoin?.label || "Select Coin"}
            </InputAdornment>
          }
        />
        {errors.amount && (
          <p className="text-red-400 p-0 m-0">{errors.amount.message}</p>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading || isLoadingEth || !canPayout}
          className="text-white w-full font-bold"
        >
          {isLoading || isLoadingEth ? (
            <>
              <span className="mr-2">Payout</span>
              <CircularProgress size={24} color="inherit" />
            </>
          ) : (
            "Payout"
          )}
        </Button>
      </Box>
      <DevTool control={control} />
    </form>
  );
};

export default TrustPayout;
