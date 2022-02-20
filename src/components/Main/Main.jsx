import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CachedIcon from '@mui/icons-material/Cached';
import { CardActions, CardContent, Fab, Paper, Modal, Box, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { getOwner, getUserData, initializeUser } from "../contracts/paymentV1"
import useWallet from "../../hooks/useWallet";
import Recharge from './components/Recharge';
import Initialize from './components/Initialize';

const style = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    textAlign: 'center',
    boxShadow: 24,
    p: 4,
  };

const Main = () => {

    const [open, setOpen] = useState(false);

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

                // let _contractAddress = await getPaymentContractAddress();
            // setContractAddress(_contractAddress);
        
        }
    }, [account]);
    
    console.log(owner);
    return (
        <div>
            <Paper>
                   <Typography variant='subtitle1' component='a' >
                      Contract Address : 
                    </Typography>

                    <Typography variant='subtitle2' component="a">
                      Contract Owner : {owner}
                    </Typography>
            </Paper>
            {userData.id ? <Recharge userId={userData.id} userBalance={userData.balance} /> : <Initialize/>}
        </div>
    )
}

export default Main;