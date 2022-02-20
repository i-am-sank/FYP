import {  Fab, Paper, Box, TextField } from '@mui/material';
import { initializeUser } from "../contracts/paymentV1"


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

const Initialize = () => {

    return (
            <Paper elevation={5}>
             <Box sx={style} component='form' >
                    <TextField
                        required
                        id="outlined-required"
                        label="IP Address"
                        placeholder='Enter IP Address'
                    />
                    <br/>
                    
                    <Fab 
                        variant='extended' 
                        sx={{width: 120, margin: 'auto', backgroundColor: 'blanchedalmond' }}
                        onClick={initializeUser} 
                    >
                        Initialise 
                    </Fab>
              </Box>      
            </Paper>
    )
}

export default Initialize;