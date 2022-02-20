import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { getOwner, getPaymentContractAddress, getUserData } from "../contracts/paymentV1"
import useWallet from "../../hooks/useWallet";
import Recharge from './components/Recharge';
import Initialize from './components/Initialize';


const Main = () => {

    const {
        account,
        status,
        connect,
    } = useWallet();

    let [owner, setOwner] = useState('');
    let [contractAddress, setContractAddress] = useState('');
    let [userData, setUserData] = useState({
        id: "",
        balance: ""
    });

    useEffect(async () => {
        if(!!account) {
            let _owner = await getOwner();
            setOwner(_owner);

            let _userData = await getUserData();
            setUserData(_userData);

            let _contractAddress = await getPaymentContractAddress();
            setContractAddress(_contractAddress);
        
        }
    }, [account]);
    
    
    return (
        <div>
            <Paper>
                   <Typography variant='subtitle1' component='a' >
                      Contract Address : {contractAddress}
                    </Typography>

                    <Typography variant='subtitle2' component="a">
                      Contract Owner : {owner}
                    </Typography>
            </Paper>
            {userData.id !== "0" ? <Recharge userId={userData.id} userBalance={userData.balance} /> : <Initialize/>}
        </div>
    )
}

export default Main;