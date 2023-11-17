import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
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
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import dTrustAbi from "@/contracts/DTrust.json";
import RevokeModal from "@/components/RevokeModal";

interface TrustRevokeProps {
  slug: string;
}

const TrustRevoke: React.FC<TrustRevokeProps> = ({ slug }) => {
  const router = useRouter();
  const address = useAddress();
  const { contract } = useContract(slug, dTrustAbi);
  const { mutateAsync } = useContractWrite(contract, "revokeContract");
  const { mutateAsync: mutateRemoveRevokableAddress } = useContractWrite(
    contract,
    "removeRevokableAddress"
  );
  const {
    data: canRevoke,
    isLoading,
    error,
  } = useContractRead(contract, "revokeAddressLookup", [address]);

  const [revokeModalOpen, setRevokeModalOpen] = useState(false);
  const [removeRevokePowerModalOpen, setRemoveRevokePowerModalOpen] =
    useState(false);
  const [revokeContractLoading, setRevokeContractLoading] = useState(false);
  const RevokeContract = async () => {
    setRevokeContractLoading(true);

    try {
      const tx = await mutateAsync({});
      toast.success("dtrust Revoked");
      setRevokeContractLoading(false);
      router.push("/dashboard");
    } catch (error) {
      console.log(error.reason, "error");
      if (error.reason) {
        toast.error(error.reason);
      }
      setRevokeContractLoading(false);
    }
  };

  const RemoveRevokeContract = async () => {
    setRevokeContractLoading(true);

    try {
      const tx = await mutateRemoveRevokableAddress({});
      toast.success("Revokable Address Removed");
      setRemoveRevokePowerModalOpen(false);
      setRevokeContractLoading(false);
    } catch (error) {
      console.log(error.reason, "error");
      if (error.reason) {
        toast.error(error.reason);
      }
      setRevokeContractLoading(false);
    }
  };

  return (
    <div className="flex justify-center gap-4 items-center  h-48 ">
      <Button
        variant="contained"
        color="primary"
        disabled={isLoading || !canRevoke}
        className="text-white"
        onClick={() => setRemoveRevokePowerModalOpen(true)}
      >
        Remove Revoke Power
      </Button>
      <RevokeModal
        cancelText="Cancel"
        confirmText="Remove Revoke Power"
        confirmLoading={revokeContractLoading}
        description="Are you sure you want to remove your revoke power? You will not be able to revoke this dtrust anymore."
        onClose={() => setRemoveRevokePowerModalOpen(false)}
        onConfirm={RemoveRevokeContract}
        open={removeRevokePowerModalOpen}
        title="Remove Revoke Power"
      />
      <Button
        variant="contained"
        color="primary"
        disabled={isLoading || !canRevoke}
        className="text-white"
        onClick={() => setRevokeModalOpen(true)}
      >
        Revoke dtrust
      </Button>
      <RevokeModal
        cancelText="Cancel"
        confirmText="Revoke"
        confirmLoading={revokeContractLoading}
        description="Are you sure you want to revoke this dtrust ?"
        onClose={() => setRevokeModalOpen(false)}
        onConfirm={RevokeContract}
        open={revokeModalOpen}
        title="Revoke dtrust"
      />
    </div>
  );
};

export default TrustRevoke;
