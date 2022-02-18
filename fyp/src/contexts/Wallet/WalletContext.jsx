import { createContext } from "react";


const WalletContext = createContext({
  account: "",
  ethereum: null,
  status: "",
  isShowingWalletModal: false,
  isMetamaskConnected: false,
  triedEagerConnect: false,
  connect: () => {},
  connector: () => {},
  reset: () => {},
  onOpenWalletModal: () => {},
  onCloseWalletModal: () => {},
  chainId: 1,
});

export default WalletContext;
