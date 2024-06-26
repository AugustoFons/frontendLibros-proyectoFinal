import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { TextField, InputLabel, Button, Stack, Select, MenuItem, FormControl, Box, Alert  } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Swal from "sweetalert2";
import '@fontsource/roboto/700.css';


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

    const addedBook= () => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Enviado',
            showConfirmButton: false,
            timer: 1500
        }).then(
            setTimeout(() => {
                navegar(0)
            }, "1500")
            )
    }
    
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
        axios.post('https://backend-libros-proyecto-final.vercel.app/post', newBook)
        .then(res => console.log(res.data))
        .then(err => console.log(err))
        addedBook()
    }



    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: '30px' }}>
            <Stack sx={{ width: '100%' }} spacing={1} mb={1}>
                <Alert severity="info">
                    Al enviar el formulario el libro se guardara automaticamente en la base de datos de MongoDB. Cuando el administrador lo califique como "aprobado" el libro sera visible en la sección principal.
                </Alert>
            </Stack>

            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 2, width: { xs:'13ch' ,sm:'25ch'} }
                }}
                noValidate
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
                            <MenuItem value={'Otros'}>Otro</MenuItem>
                        </Select>
                    </FormControl>
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
                            inputProps={{ maxLength: 280 }}
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
                    Limpiar
                </Button>
                <Button variant="contained" endIcon={<SendIcon />} onClick={addBook}>
                    Enviar
                </Button>
            </Stack>
        </div>
        
    );
}

export default AddForm