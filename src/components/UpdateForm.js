import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { TextField, InputLabel, Button, Stack, Select, MenuItem, FormControl, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import '@fontsource/roboto/700.css';


const UpdateForm = () =>{
    const params = useParams()
    const [titulo, setTitulo] = useState('');
    const [escritor, setEscritor] = useState('');
    const [descripcion, setDescripcion] = useState('')
    const [descripcionBreve, setDescripcionBreve] = useState('')
    const [año, setAño] = useState('')
    const [idioma, setIdioma] = useState('')
    const [imagen, setImagen] = useState('')
    const [descarga, setDescarga] = useState('')
    const navegar = useNavigate()

    const [data, setData] = useState([]);
    useEffect(() => {
        obtenerLibros();
        }, []);
    const obtenerLibros = async () =>{
        const Libro = (await axios.get('https://backend-proyectofinal-production.up.railway.app/get/' + params.id)).data
        console.log(Libro)
        setData(Libro)
        setTitulo(Libro.item.title);
        setEscritor(Libro.item.author)
        setDescripcion(Libro.item.content)
        setDescripcionBreve(Libro.item.content_short)
        setAño(Libro.item.publisher_date)
        setIdioma(Libro.item.language)
        setImagen(Libro.item.cover)
        setDescarga(Libro.item.url_download)
        }

    function updateBook(){
        const editBook = {
            title: titulo,
            author: escritor,
            content: descripcion,
            content_short: descripcionBreve,
            publisher_date: año,
            language: idioma,
            cover: imagen,
            url_download: descarga
        }
        axios.patch('https://backend-proyectofinal-production.up.railway.app/update/' + params.id, editBook).then(res => {
            console.log(res.data)
            alert('libro actualizado')
            navegar('/')
        })
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: '30px' }}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: { xs:'13ch' ,sm:'25ch'} }
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
                    <FormControl sx={{ m: 1, width: { xs:'13ch' ,sm:'25ch'} }} >
                        <InputLabel id="demo-select-flexible">Idioma</InputLabel>
                        <Select
                            labelId="demo-select-flexible"
                            id="demo-select-flexible"
                            value={idioma}
                            label="Idioma"
                            onChange={(e) => setIdioma(e.target.value)}              
                            >
                            <MenuItem value={'spanish'}>Español</MenuItem>
                            <MenuItem value={'english'}>Ingles</MenuItem>
                            <MenuItem value={'otros'}>Otro</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <TextField
                        id="standard-multiline-flexible"
                        label="URL imagen"
                        multiline
                        variant="standard"
                        rows={2}
                        value={imagen}
                        onChange={(e) => setImagen(e.target.value)}
                        />
                    <TextField
                        id="standard-textarea"
                        label="URL descarga"
                        multiline
                        variant="standard"
                        rows={2}
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
                            label="Descripcion breve o temas"
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
                <Button variant="contained" endIcon={<SendIcon />} onClick={updateBook}>
                    Send
                </Button>
            </Stack>
        </div>  
    )
}

export default UpdateForm