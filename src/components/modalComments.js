import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CommentIcon from '@mui/icons-material/InsertComment';
import Badge from '@mui/material/Badge';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MarkChatReadTwoToneIcon from '@mui/icons-material/MarkChatReadTwoTone';
import { IconButton } from '@mui/material';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    }));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid secondary',
    boxShadow: 24,
    p: 4,
    };

export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
        <Badge onClick={handleOpen} badgeContent={99} aria-label="add to favorites" color="primary">
            <CommentIcon />
        </Badge>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <IconButton color="secondary">
          <MarkChatReadTwoToneIcon  fontSize='large' />
        </IconButton>
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" color="secondary" />
      <ListItem>

      <p>ndiednowinfwoifniowfnw</p>
      </ListItem>

      </List>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div>
        <TextField
            fullWidth 
            label="Nombre - Comentario"
            id="outlined-start-adornment"
            sx={{ m: 1, padding: 0 }}
            placeholder="Comentario"
            InputProps={{
            startAdornment: <InputAdornment position="start">
                <TextField
                hiddenLabel
                id="filled-hidden-label-normal"
                defaultValue="Normal"
                variant="filled"
                placeholder='Nombre'
                sx={{ mr: 2, width: '15ch' }}
                />
                <p>-</p>
                </InputAdornment>,
                
          }}
        />
        </div>
        </Box>
            </Box>
        </Modal>
        </div>
    );
}
