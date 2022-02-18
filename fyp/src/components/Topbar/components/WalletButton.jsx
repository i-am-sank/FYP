import React, { useCallback } from "react";

import Button  from "@mui/material/Button";
import useWallet from "../../../hooks/useWallet";


const WalletButton = () => {
  const {
    account,
    status,
    connect,
  } = useWallet();

  const onClick = useCallback(() => {
    // If the user comes from the onto app it should directly connect without opening the web3 modal
      if (status !== 'connected'){
        connect("injected");
      }
    
  }, [status, connect]);

  const openWalletText = !!account ? "Connected" : "Unlock Wallet";

  return (
    <>
        <Button
          onClick={onClick}
          sx={{ my: 2, color: 'white', display: 'block' }}
          disabled={!!account}
        >
            {openWalletText}
        </Button>
    </>
  );
};


export default WalletButton;
