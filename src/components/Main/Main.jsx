import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CachedIcon from '@mui/icons-material/Cached';
import { CardActions, CardContent, Fab, Paper, Modal, Box, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

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

    return (
        <div>
            <Paper elevation={5}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Low Balance
                    </Typography>
                    
                    <Typography variant="h5" component="div">
                    ₹ 20.03
                    </Typography>
                    
                </CardContent>
                <CardActions>
                    <Button loading sx={{margin: 'auto'}} startIcon={<CachedIcon/> } >Current Balance</Button>
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
                    <TextField
                        required
                        id="outlined-required"
                        label="Amount"
                        placeholder='Enter Amount'
                    />
                    <br/>
                    
                    <Fab variant='extended' sx={{width: 120, margin: 'auto', backgroundColor: 'blanchedalmond' }} >
                        Recharge
                    </Fab>

                    </Box>
                </Modal>
        </div>
    )
}

export default Main;