import { createContext } from "react";

type STATE_PROPS = {
    openModal: boolean;
    setStage: (value: string) => void;
    stage: string | null;
    address: string | undefined;
    disconnect: (() => Promise<void>) | null;
    choosedStage: ((value: string) => void) | null
    openedModal: ((value: boolean) => void) | null
    connectionStatus: string
  };

const INITIAL_STATE = {
  openModal: false,
  stage: "convert",
  setStage: (value: string) => "convert",
  address: "",
  disconnect: null,
  choosedStage: null,
  openedModal:  null,
  connectionStatus: 'unknown'
};

export const Context = createContext<STATE_PROPS>(INITIAL_STATE);
