import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CachedIcon from '@mui/icons-material/Cached';
import { CardActions, CardContent, Fab, Paper, Modal, Box, TextField, MenuItem, InputLabel, Select, FormControl } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import useWallet from "../../../hooks/useWallet";
import { approveToken, getAcceptedTokens, recharge } from '../../contracts/paymentV1';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

const Recharge = ({userId , userBalances, fetchUserData}) => {

    const [open, setOpen] = useState(false);
    const [acceptedTokensList, setTokensList] = useState([]);
    const {
        account
    } = useWallet();
    const [selectedToken, setSelectedToken] = useState('');
    const [rechargeValue, setRechargeValue] = useState(null);
    const [button, setButton] = useState('confirm');
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarOpen, setSnackBarOpen] = React.useState(false);

  
    const handleSnackBarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackBarOpen(false);
    };

    

    useEffect( () => { 
        
        const fetchTokens = async () => {
            if(!!account) {

                let _acceptedTokens = await getAcceptedTokens();
                setTokensList(_acceptedTokens);

            }
        }

        fetchTokens();

    }, [account, userBalances]);
    
    const handleButtonState = async (e) => {
        if(button === 'confirm'){
            if(Number(selectedToken.allowance) > rechargeValue){
                setButton('recharge');
            }
            else{
                setButton('approve');
            }
        }
        else if(button === 'recharge'){
            // recharge
            const transactionHash =await recharge(selectedToken.address, rechargeValue)
            console.log('recharge');

            if(!!transactionHash){
                setSnackBarOpen(true);
                setSnackBarMessage(`Recharge of ${rechargeValue} ${selectedToken.symbol} successful!`);
                setOpen(false);
            }
        }
        else{
            console.log('approve');
            const transactionHash = await approveToken(selectedToken.address, rechargeValue);

            if(!!transactionHash){
                setSnackBarOpen(true);
                setSnackBarMessage(`Approved ${rechargeValue} ${selectedToken.symbol} to Payment contract`);
                setButton('recharge');
            }
        }
    }

    return (
        <div>
            <Paper elevation={5}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Low Balance
                    </Typography> */}
                    
                    <Typography sx={{ fontSize: 14 }} color='gray' gutterBottom>
                      ID: {userId}
                    </Typography>

                    <Typography variant="h5" component="div" color={'green'}>
                      ₹ {
                        userBalances.map((balanceData, ) => {
                            return <>
                                <div><strong>{balanceData.symbol}</strong></div>
                                <div><small>Balance: {balanceData.balance}</small></div>
                            </>
                        })
                      }
                    </Typography>
                    
                </CardContent>
                <CardActions>
                    <Button 
                        loading 
                        sx={{margin: 'auto'}} 
                        startIcon={<CachedIcon/>} 
                        onClick={e => fetchUserData()}
                    >
                        Current Balance
                    </Button>
                </CardActions>
            </Card>
            </Paper>
            <br/>
            <Fab variant='extended' onClick={e => setOpen(true)}>
                Recharge Now
             </Fab>
             <Modal
                open={open}
                onClose={e => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <Box sx={style} component='form' >
                        <FormControl variant='filled'>
                            <InputLabel id="demo-simple-select-filled-label">Choose Token</InputLabel>
                            <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={selectedToken}
                            onChange={e => setSelectedToken(e.target.value)}
                            >
                                {acceptedTokensList.map(token => {
                                    return (
                                        <MenuItem value={token}>
                                            <div><strong>{token.symbol}</strong></div> 
                                            
                                            <div><small>Balance: {token.balance}</small></div>
                                        </MenuItem>
                                    )
                                })}
                                
                            </Select>
                        </FormControl>
                        <br/>
                        <TextField
                            required
                            id="outlined-required"
                            label="Amount"
                            placeholder='Enter Amount'
                            value={rechargeValue}
                            onChange={e => setRechargeValue(Number(e.target.value))}
                        />
                        <br/>
                        
                        <Fab variant='extended' sx={{width: 120, margin: 'auto', backgroundColor: 'blanchedalmond' }} onClick={handleButtonState}>
                            {button}
                        </Fab>

                    </Box>
                </Modal>
                <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackBarClose}>
                    <Alert onClose={handleSnackBarClose} severity="success" sx={{ width: '100%' }}>
                        { snackBarMessage }
                    </Alert>
                </Snackbar>
        </div>
        
    )
}

export default Recharge;