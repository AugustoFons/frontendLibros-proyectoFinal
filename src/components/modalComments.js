import * as React from 'react';
import { useState } from "react";
import axios from 'axios';
import {Box, Modal, Badge, List, ListItem, Divider, ListItemText, TextField, Typography, Button } from '@mui/material/';
import CommentIcon from '@mui/icons-material/InsertComment';
import MarkChatReadTwoToneIcon from '@mui/icons-material/MarkChatReadTwoTone';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

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

export default function BasicModal({item}) {
	const [comentarios, setComentarios] = useState('');
	const [name, setName] = useState('');
	let nameComment = `${name} — ${comentarios}`;
	console.log(nameComment)

	function addComment(){
        const newComment = {
            comments: nameComment 
        }
        axios.post('https://ochre-fawn-wrap.cyclic.app/postcomment/' + item._id, newComment)
        .then(res => console.log(res.data))
        .then(err => console.log(err))
        alert('comentario agregado')
		window.location.replace('/'); //uso el window location para que me recargue el pedido get a la base de datos con el libro actualizado
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

	return (
	<div>
		<Badge onClick={handleOpen} badgeContent={item.comments.length} aria-label="add to favorites" color="secondary">
			<CommentIcon color="primary" />
		</Badge>
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			>
			<Box sx={style}>
			<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
				{[...item.comments].map((comment) => {
				return (
				<>
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
								{comment.split('—')[0]}
								</Typography>
								{` — ${comment.split('—')[1]}`}
							</React.Fragment>
							}
						/>
					</ListItem>
					<Divider variant="inset" component="li" color="secondary" />
				</>
				)
				})
			}
			</List>
			<Box
				component="form"
		/*        sx={{
				'& .MuiTextField-root': { m: 1, width: '25ch' },
				}} */
				noValidate
				autoComplete="off"
				>
				<TextField
					id="filled-multiline-flexible"
					multiline
					maxRows={4}
					variant="filled"
					placeholder='Nombre'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<div>
					<TextField
						fullWidth
						id="filled-multiline-static"
						multiline
						rows={4}
						variant="filled"
						placeholder="Comentario"
						value={comentarios}
						onChange={(e) => setComentarios(e.target.value)}
					/>
				</div>
				<Button variant="contained" endIcon={<SendIcon />} onClick={addComment}>
                    Send
                </Button>
			</Box>
			</Box>
		</Modal>
	</div>
	);
}
