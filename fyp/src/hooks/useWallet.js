import { useContext } from "react";

import WalletContext from "../contexts/Wallet/WalletContext";

const useWallet = () => {
  return { ...useContext(WalletContext) };
};

export default useWallet;
