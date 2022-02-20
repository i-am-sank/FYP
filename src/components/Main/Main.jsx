import { Box, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { getOwner, getPaymentContractAddress, getUserData } from "../contracts/paymentV1"
import useWallet from "../../hooks/useWallet";
import Recharge from './components/Recharge';
import Initialize from './components/Initialize';


const Main = () => {

    const {
        account
    } = useWallet();

    let [owner, setOwner] = useState('');
    let [contractAddress, setContractAddress] = useState('');
    let [userData, setUserData] = useState({
        id: "0",
        balances: [""]
    });

    const fetchUserData = async () => {
        if(!!account){
            console.log('fecthing');
            let _userData = await getUserData();
            setUserData(_userData);
        }
    }

    useEffect(() => {

        const fetchdata = async () => {
            if(!!account) {
                let _owner = await getOwner();
                setOwner(_owner);
    
                let _contractAddress = await getPaymentContractAddress();
                setContractAddress(_contractAddress);
            }
        }
        fetchdata();
        fetchUserData();

    }, [account]);
    

    
    return (
        <div>
            <Paper elevation={5}>
                   <Box sx={{padding: '25px'}}>
                   <Typography variant='subtitle1' color='GrayText' component='a' >
                      Contract Address : {contractAddress}
                    </Typography>
                    <br/>
                    <Typography variant='subtitle1' color='GrayText' component="a">
                      Contract Owner : {owner}
                    </Typography>
                   </Box>
            </Paper>
            <br/>
            {   
                userData.id !== "0"  
                ? <Recharge userId={userData.id} userBalances={userData.balances} fetchUserData={fetchUserData} /> 
                : <Initialize fetchUserData={fetchUserData}/>
            }
        </div>
    )
}

export default Main;