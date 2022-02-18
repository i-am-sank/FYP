import React, { useCallback, useState } from "react";

import { useWeb3React, Web3ReactProvider } from "@web3-react/core";

// import useEagerConnect from "hooks/useEagerConnect";
import { injected } from "../../utils/connectors";
import WalletContext from "./WalletContext";

const WalletProvider = ({ children }) => {

  const [status, setStatus] = useState("disconnected");
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);
  
  const {
    account,
    activate,
    active,
    deactivate,
    library: ethereum,
    chainId,
  } = useWeb3React();

  const reset = useCallback(() => {
    if (active) deactivate();
    setStatus("disconnected");
    localStorage.removeItem("walletconnect");
  }, [active, deactivate]);

  const connect = useCallback(
    async () => {
      try {
        reset();
        setStatus("connecting");
        
        activate(injected, undefined, true);
        setStatus("connected");
        setIsMetamaskConnected(true);

      } catch (err) {
        console.log(err);
        // if (err instanceof Error) {
        //   if (err.name === "UnsupportedChainIdError") {
        //     toast.error("Wrong network. Please switch network on Metamask");
        //   } else {
        //     toast.error(err.message);
        //   }
        // }
      }
    },
    [activate, reset]
  );

 // const triedEagerConnect = useEagerConnect(connect);

  return (
    <WalletContext.Provider
      value={{
        account,
        ethereum,
        status,
        isMetamaskConnected,
      //  triedEagerConnect,
        connect,
        reset,
        chainId,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};


function UseWalletProviderWrapper(props) {
  return (
    <Web3ReactProvider getLibrary={(ethereum) => ethereum}>
      <WalletProvider {...props} />
    </Web3ReactProvider>
  );
}

export default UseWalletProviderWrapper;
