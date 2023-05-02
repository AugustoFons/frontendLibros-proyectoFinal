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

	const initialForm = {
		name: '',        
		comentario: '',
	}

export default function BasicModal({item, obtenerLibros}) {
	const [comentarios, setComentarios] = useState(initialForm);
	let nameComment = `${comentarios.name} — ${comentarios.comentario}`;
	console.log(nameComment)

	const addComment = async () => {
		const newComment = {
			comments: nameComment 
		}
		const ENDPOINT = 'https://ochre-fawn-wrap.cyclic.app/postcomment/' + item._id;
		const OPTIONS = {
			method: "POST",
			headers: {"content-type": "application/json"},
			data: JSON.stringify(newComment) ,
		}
		await axios(ENDPOINT, OPTIONS);
		obtenerLibros()
    }

	const handleChange = (e) => setComentarios ({
        ...comentarios,
        [e.target.name]: e.target.value 
    })
	const handleSubmit = (e) => {
        e.preventDefault() //evita recargas en el submit
            addComment(comentarios)
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

	return (
	<div>
		<form onSubmit={handleSubmit}>
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
				noValidate
				autoComplete="off"
				>
				<TextField
					id="filled-multiline-flexible"
					multiline
					maxRows={4}
					variant="filled"
					placeholder='Nombre'
					name='name'
					value={comentarios.name}
					onChange={handleChange}				
					/>
				<div>
					<TextField
						fullWidth
						id="filled-multiline-static"
						multiline
						rows={4}
						variant="filled"
						placeholder="Comentario"
						name='comentario'
						value={comentarios.comentario}
						onChange={handleChange}					/>
				</div>
				<Button variant="contained" type='submit' endIcon={<SendIcon />}>
                    Send
                </Button>
			</Box>
			</Box>
		</Modal>
		</form>
	</div>
	);
}
