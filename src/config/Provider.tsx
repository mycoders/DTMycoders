import React, { ReactNode, useEffect, useMemo, useState } from "react";

import { Context } from "./context";
import { useAddress, useDisconnect, useLogin ,useConnectedWallet, useConnectionStatus } from "@thirdweb-dev/react";

type ProviderProps = {
    children: JSX.Element
};

const Provider = ({ children }: ProviderProps) => {
  
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { isLoading, login } = useLogin();
  const [stagee, setStage] = useState<string | null>("convert");
  const address = useAddress();
  const disconnect = useDisconnect()
  const connectionStatus = useConnectionStatus();

  const choosedStage = (value: string) => {
    localStorage.setItem('stage', value);
    
    setStage(value)
  }

  const openedModal = (value: boolean) => {
    localStorage.setItem('openModalWindow', String(value))

    setOpenModal(value)
  }

  useEffect(() => {
    const choosedStage = localStorage.getItem('stage')
    const openedModal = localStorage.getItem('openModalWindow')
    
    setStage(choosedStage)
    setOpenModal(openedModal == "true")
  }, [])

  useEffect(() => {
    if(address){
      login();
    }
  }, [address])

  const stage = useMemo(() => stagee, [stagee])

  return (
    <Context.Provider
      value={{
        openModal,
        setStage,
        stage,
        address,
        disconnect,
        choosedStage,
        openedModal,
        connectionStatus
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
