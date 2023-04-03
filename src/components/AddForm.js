import React from "react";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { TextField, NativeSelect, InputLabel, Button, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';


const AddForm = () => {
    const [titulo, setTitulo] = useState('');
    const [escritor, setEscritor] = useState('');
    const [descripcion, setDescripcion] = useState('')
    const [descripcionBreve, setDescripcionBreve] = useState('')
    const [año, setAño] = useState('')
    const [idioma, setIdioma] = useState('')
    const [imagen, setImagen] = useState('')
    const [descarga, setDescarga] = useState('')
    const navegar = useNavigate()

    function addBook(){
        const newBook = {
            title: titulo,
            author: escritor,
            content: descripcion,
            content_short: descripcionBreve,
            publisher_date: año,
            language: idioma,
            cover: imagen,
            url_download: descarga
        }
        axios.post('https://backend-proyectofinal-production.up.railway.app/post', newBook)
        .then(res => console.log(res.data))
        .then(err => console.log(err))
        alert('libro agregado')
        navegar(0)
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: { xs:'13ch' ,sm:'25ch'} }, padding: '10px'
            }}
            noValidate
            autoComplete="off"
            >
            <div style={{ display: "flex", wrap: "noWrap" }}>
                <TextField
                    id="outlined-multiline-flexible"
                    required
                    label="Titulo"
                    multiline
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    />
                <TextField
                    id="outlined-textarea"
                    label="Autor"
                    multiline
                    value={escritor}
                    onChange={(e) => setEscritor(e.target.value)}
                    />
            </div>
            <div style={{ display: "flex", alignItems: "center"}}>
                <TextField
                    id="filled-multiline-flexible"
                    label="Año"
                    value={año}
                    onChange={(e) => setAño(e.target.value)}
                    />
                <div style={{ display: "flex", flexDirection: "column", alignContent: "center", paddingLeft: "11px" }}>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native" value={idioma} onChange={(e) => setIdioma(e.target.value)}>
                        Idioma
                        </InputLabel>
                        <NativeSelect
                                inputProps={{
                                name: 'age',
                                id: 'uncontrolled-native',
                                }}
                        >
                        <option>Español</option>
                        <option>Ingles</option>
                        <option>Otro</option>
                        </NativeSelect>
                </div>

            </div>
            <div>
                <TextField
                    id="standard-multiline-flexible"
                    label="URL imagen"
                    multiline
                    variant="standard"
                    value={imagen}
                    onChange={(e) => setImagen(e.target.value)}
                    />
                <TextField
                    id="standard-textarea"
                    label="URL descarga"
                    multiline
                    variant="standard"
                    value={descarga}
                    onChange={(e) => setDescarga(e.target.value)}
                    />
            </div>
        </Box>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: { xs:'30ch' ,sm:'52ch'} },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                        id="outlined-multiline-static"
                        label="descripcion breve"
                        multiline
                        rows={2}
                        value={descripcionBreve}
                        onChange={(e) => setDescripcionBreve(e.target.value)}
                        />
            </div>
            <div>
                <TextField
                    id="filled-multiline-static"
                    label="Descripcion extendida"
                    multiline
                    rows={5}
                    variant="filled"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    />
            </div>
        </Box>
        <Stack direction="row" spacing={2}>
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => {setTitulo(''); setEscritor(''); setAño(''); setImagen(''); setDescarga(''); setDescripcionBreve(''); setDescripcion('')}}>
                Delete
            </Button>
            <Button variant="contained" endIcon={<SendIcon />} onClick={addBook}>
                Send
            </Button>
        </Stack>
        </div>
        
    );
}

export default AddForm