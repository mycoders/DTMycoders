import React, { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Stack,
  Checkbox,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useContract, useContractWrite, useSDK } from "@thirdweb-dev/react";
import { createTrustSchema } from "@/utils/formSchemas";
import CircularProgress from "@mui/material/CircularProgress";
import { DevTool } from "@hookform/devtools";
import DtrustFactoryJson from "../contracts/DtrustFactory.json";
const NewTrustPage = () => {
  const [creatingTrustLoader, setCreatingTrustLoader] = useState(false);
  const [trustTransactionHash, setTrustTransactionHash] = useState("");
  const sdk = useSDK();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createTrustSchema),
    mode: "onTouched",
    criteriaMode: "all",
    shouldUnregister: false,
  });

  const {
    fields: trusteeFields,
    append: appendTrustee,
    remove: removeTrustee,
  } = useFieldArray({
    control,
    name: "trustees",
  });

  const {
    fields: beneficiaryFields,
    append: appendBeneficiary,
    remove: removeBeneficiary,
  } = useFieldArray({
    control,
    name: "beneficiaries",
  });
  const router = useRouter();

  const { contract } = useContract(
    process.env.NEXT_PUBLIC_DTRUST_FACTORY_ADDRESS
  );

  const {
    mutate: createDtrustNonAsync,
    mutateAsync: createDTRUST,
    isLoading,
    error,
    data,
  } = useContractWrite(contract, "createDTRUST");

  const onSubmit = async (data) => {
    try {
      console.log("Form data submitted:", data);
      console.log("Form errors:", errors);
      const canRevokeAddresses = [
        ...data.trustees
          .filter((trustee) => trustee.canRevoke)
          .map((trustee) => trustee.address),
        ...(data.settlorCanRevoke ? [data.settlorAddress] : []),
      ];

      const anotherContract = await sdk.getContract(
        process.env.NEXT_PUBLIC_DTRUST_FACTORY_ADDRESS,
        DtrustFactoryJson
      );

      const preparedContract = await anotherContract.prepare("createDTRUST", [
        data.trustName,
        data.settlorAddress,
        data.trustees.map((trustee) => trustee.address),
        data.beneficiaries.map((beneficiary) => beneficiary.address),
        canRevokeAddresses,
      ]);

      const sentTx = await preparedContract.send();
      const txHash = sentTx.hash;
      console.log(txHash, "txHash");
      setCreatingTrustLoader(true);
      setTrustTransactionHash(txHash);
      await sentTx.wait(2);
      toast.success("dtrust Created");
      setCreatingTrustLoader(false);
      // wait for 5 seconds then redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("contract call failure", err);
      toast.error("Something went wrong");
      setCreatingTrustLoader(false);
    }
  };

  return (
    <Box className="container mx-auto max-w-lg">
      <Typography variant="h2" className="font-medium mt-2" gutterBottom>
        Create dtrust
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit, (e) =>
          toast.error("Please add at least one trustee and beneficiary", {
            autoClose: 5000,
          })
        )}
      >
        <Stack spacing={2}>
          <TextField
            label="dtrust Name"
            fullWidth
            required
            {...register("trustName")}
            error={!!errors.trustName}
            helperText={errors.trustName?.message}
          />
          <div className="flex items-center ">
            <TextField
              label="Settlor Address"
              fullWidth
              required
              {...register("settlorAddress")}
              error={!!errors.settlorAddress}
              helperText={errors.settlorAddress?.message}
            />
            <div className=" flex flex-col items-center justify-center min-w-[137px]">
              <label className="text-xs">Can Revoke</label>
              <Controller
                name="settlorCanRevoke"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} color="primary" />}
              />
            </div>
          </div>
          <Typography variant="subtitle1">Add Trustees</Typography>
          {trusteeFields.map((field, index) => (
            <Box key={field.id} display="flex" alignItems="center">
              {trusteeFields.length > 1 && (
                <IconButton
                  color="primary"
                  aria-label="Remove Trustee"
                  onClick={() => removeTrustee(index)}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              )}
              <TextField
                label="Trustee Address"
                fullWidth
                required
                {...register(`trustees.${index}.address`)}
                error={!!errors.trustees?.[index]?.address}
                helperText={errors.trustees?.[index]?.address?.message}
              />
              <div className=" flex flex-col items-center justify-center min-w-[137px]">
                <label className="text-xs">Can Revoke</label>
                <Controller
                  name={`trustees.${index}.canRevoke`}
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Checkbox {...field} color="primary" />
                  )}
                />
              </div>
            </Box>
          ))}
          <Button
            onClick={() => appendTrustee({})}
            variant="contained"
            sx={{ backgroundColor: "#FE7E34", color: "white", mb: 2 }}
          >
            + New Trustee
          </Button>
          <Typography variant="subtitle1">Add Beneficiaries</Typography>
          {beneficiaryFields.map((field, index) => (
            <Box key={field.id} display="flex" alignItems="center">
              {beneficiaryFields.length > 1 && (
                <IconButton
                  color="primary"
                  aria-label="Remove Beneficiary"
                  onClick={() => removeBeneficiary(index)}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              )}
              <TextField
                label="Beneficiary Address"
                fullWidth
                required
                {...register(`beneficiaries.${index}.address`)}
                error={!!errors.beneficiaries?.[index]?.address}
                helperText={errors.beneficiaries?.[index]?.address?.message}
              />
            </Box>
          ))}
          <Button
            onClick={() => appendBeneficiary({})}
            variant="contained"
            sx={{ backgroundColor: "#FE7E34", color: "white" }}
          >
            + New Beneficiary
          </Button>
          <Button
            disabled={creatingTrustLoader}
            variant="contained"
            sx={{ backgroundColor: "green", color: "white" }}
            type="submit"
          >
            {creatingTrustLoader ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Create dtrust"
            )}
          </Button>
          {trustTransactionHash && (
            <a
              href={`${process.env.NEXT_PUBLIC_BLOCKCHAIN_EXPLORER_URL}${trustTransactionHash}`}
              target="_blank"
              rel="noreferrer"
              className="ml-auto mr-auto"
            >
              View Transaction on Ethereum explorer
            </a>
          )}
        </Stack>
      </form>
    </Box>
  );
};

export default NewTrustPage;
