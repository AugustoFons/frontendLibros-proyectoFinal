import * as React from 'react';
import { useState } from "react";
import axios from 'axios';
import {Box, Modal, Badge, List, ListItem, Divider, ListItemText, TextField, Typography, Button, Stack } from '@mui/material/';
import CommentIcon from '@mui/icons-material/InsertComment';
import MarkChatReadTwoToneIcon from '@mui/icons-material/MarkChatReadTwoTone';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Rating from '@mui/material/Rating';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '3px solid secondary',
	borderRadius: '15px',
    boxShadow: 44,
    p: 3,
    };

	const initialForm = {
		name: '',        
		comentario: '',
	}

export default function BasicModal({item, obtenerLibros, title}) {
	
	/*** componente rating ***/
	const [value, setValue] = React.useState(3);

	/*** POST a los comentarios y funciones de envio a la db ***/
	const [comentarios, setComentarios] = useState(initialForm);
	let points = value
	let nameComment = `${points} — ${comentarios.name} — ${comentarios.comentario}`;
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

	/*** funciones mui ***/ 
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	return (
	<div>
		<form onSubmit={handleSubmit}>
		<Badge onClick={handleOpen} badgeContent={item.comments.length} aria-label="add to favorites" color="secondary">
			<CommentIcon color="primary" />
		</Badge>
		<Modal
			fullscreen={fullScreen}
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			>
			<Box sx={style}>
				<Typography variant="body1" component="h2" sx={{textAlign: 'center', alignItems: 'center', mb: '20px'}}>
				{title}
				</Typography>
				<Divider />
				{
					item.comments.length === 0 ? 
					<ListItem alignItems="center">
						<IconButton color="secondary">
							<CommentsDisabledIcon  fontSize='large' />
						</IconButton>
					<ListItemText>
						{'Sin comentarios...'}
					</ListItemText>
					</ListItem>
					: null
				}
				<List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: '300px', overflowY: 'auto'}}>
					{[...item.comments].map((comment) => {
					return (
					<>
						<ListItem alignItems="flex-start" style={{hyphens: "auto"}}>
							<IconButton color="secondary">
								<MarkChatReadTwoToneIcon  fontSize='large' />
							</IconButton>
							<ListItemText
								primary={
									<React.Fragment>
										<Rating name="read-only" value={comment.split('—')[0]} readOnly />
									</React.Fragment>
								}
								secondary={
								<React.Fragment sx={{display: 'flex' }} >
									<Typography
									sx={{ display: 'inline' }}
									component="span"
									variant="body2"
									color="text.primary"
									>
									{`${comment.split('—')[1]} — `}
									</Typography>
									{`${comment.split('—')[2]}`}
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
				<Box sx={{display: 'flex', mb: 2, alignItems:'center', justifyContent: 'flex-start'}}>
					<TextField
						id="filled-multiline-flexible"
						multiline
						rows={1}
						variant="filled"
						placeholder='Nombre'
						name='name'
						value={comentarios.name}
						onChange={handleChange}				
						/>
					<Box
						sx={{
							'& > legend': { mt: 1}, textAlign: 'center', ml: fullScreen ? 0 : 7
						}}
						>
							<Typography component="legend">Puntuacion</Typography>
							<Rating
							name="simple-controlled"
							value={value}
							onChange={(event, newValue) => {
							setValue(newValue);
							}}
						/>
					</Box>
				</Box>
				<Box sx={{mb: 2}}>
					<TextField
						fullWidth
						id="filled-multiline-static"
						multiline
						rows={2}
						variant="filled"
						placeholder="Comentario"
						name='comentario'
						value={comentarios.comentario}
						onChange={handleChange}	/>
				</Box>
				<Stack spacing={3} direction="row" sx={{justifyContent: 'center'}} >
					<Button variant="contained" type='submit' endIcon={<SendIcon />}>
						Enviar
					</Button>
					<Button onClick={handleClose} variant="outlined" type='submit' endIcon={<SendIcon />}>
						Cerrar
					</Button>
				</Stack>

			</Box>
			</Box>
		</Modal>
		</form>
	</div>
	);
}
