import {  Fab, Paper, Box, TextField } from '@mui/material';
import { initializeUser } from "../../contracts/paymentV1"
import {useState} from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
    textAlign: 'center',
    margin: 'auto',
    p: 4,
  };

const Initialize = (props) => {

    const [ipAddress, setIpAddress] = useState('');
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarOpen, setSnackBarOpen] = React.useState(false);

    const handleSnackBarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackBarOpen(false);
    };

    const handleClick = async () => {
        const transactionHash = await initializeUser(ipAddress);

        if(!!transactionHash) {
            setSnackBarOpen(true);
            setSnackBarMessage(`User initialized with IP address ${ipAddress}`);
            await props.fetchUserData();
        }
    }

    return (
            <Paper elevation={5}>
                <Box sx={style} component='form' >
                    <TextField
                        required
                        id="outlined-required"
                        label="IP Address"
                        placeholder='Enter IP Address'
                        value={ipAddress}
                        onChange={(e) => setIpAddress(e.target.value)}
                    />
                    <br/>
                    
                    <Fab 
                        variant='extended' 
                        sx={{width: 120, margin: 'auto', backgroundColor: 'blanchedalmond' }}
                        onClick={handleClick} 
                    >
                        Initialise 
                    </Fab>
                </Box>
                <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackBarClose}>
                    <Alert onClose={handleSnackBarClose} severity="success" sx={{ width: '100%' }}>
                        { snackBarMessage }
                    </Alert>
                </Snackbar>
            </Paper>
    )
}

export default Initialize;