import {  Fab, Paper, Box, TextField } from '@mui/material';
import { initializeUser } from "../../contracts/paymentV1"
import {useState} from "react";


const style = {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
    textAlign: 'center',
    margin: 'auto',
    p: 4,
  };

const Initialize = () => {

    const [ipAddress, setIpAddress] = useState('');

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
                        onClick={(e) => initializeUser(ipAddress)} 
                    >
                        Initialise 
                    </Fab>
              </Box>      
            </Paper>
    )
}

export default Initialize;