import * as React from 'react';
import {Link} from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton, Badge, InputBase } from '@mui/material';
import Logo from '../images/logonew.png'
import Titulo from '../images/librosp.png'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import '@fontsource/roboto/500.css';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
        width: '20ch',
        },
    },
    },
}));

export default function SearchAppBar({setSearchValue, searchValue}) {

    const proyectoInfo = () => {
        Swal.fire({
            html:
            'Esta página es parte del proyecto final de backend que realice en <b>Academia Numen</b>, quien desee puede agregar libros sobre programación desde el boton de colaborar, cada libro puede ser descargado(mediante una URL externa), comentado y editado(función deshabilitada hasta resolver roles de usuarios). Para más informacion sobre la pagina y las herramientas utilizadas dirigirse a los repositorios <b><a href="https://github.com/AugustoFons/frontendLibros-proyectoFinal">Frontend</a></b> y <b><a href="https://github.com/AugustoFons/backendLibros-proyectoFinal">Backend</a></b>. ' +
            '<br>Al final de la pagina podran encontrar mi <b>contacto</b> ante cualquier duda.',
            icon: 'info',
            iconColor: '#65AD4F',
            confirmButtonColor: '#65AD4F',
            focusConfirm: false,
        })
    }

    const onSearchValueChange = (event) => {  
        setSearchValue(event.target.value);
    }

    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )
    useEffect(() => {
        window
        .matchMedia("(min-width: 592px)")
        .addEventListener('change', e => setMatches( e.matches ));
    }, []);

    return (
    <Box  sx={{ display: "flex", flexGrow: 1, flexDirection:"column" }}>
                
        <AppBar width="xl" position="static" color="transparent" sx={{alignItems: !matches ? 'center' : null}}  >
                {!matches &&
                        <Link to={`/`} style={{ flexGrow: 1 }}>
                        <Badge  
                        color="primary"
                        nowrap
                        height="100%"
                        sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', padding: 1 }}>
                            <img src={Logo} alt="logo libros" width={'60rem'} />
                            <img src={Titulo} alt="titulo" width={'70rem'} style={{ paddingLeft: "10px" }}/>
                        </Badge>
                        </Link>

                }
            <Toolbar >
            {matches &&

                <Link to={`/`} style={{ flexGrow: 1 }}>
                    <Badge  
                    color="primary"
                    nowrap
                    height="100%"
                    sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', padding: 1 }}
                    >
                        <>
                        <img src={Logo} alt="logo libros" width={'70rem'} />
                        <img src={Titulo} alt="titulo" width={'90rem'} style={{ paddingLeft: "10px" }}/>
                        </>
                    </Badge>
                </Link>
            }

            <Search>
                <SearchIconWrapper>
                <SearchIcon color="primary" />
                </SearchIconWrapper>
                <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search',  sx: { color: "#5a794f" } }}
                value={searchValue}
                onChange={onSearchValueChange}
                />
            </Search>
            <IconButton
                size="large"
                edge="start"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={() => proyectoInfo()} 
            >
                <InfoOutlinedIcon color="primary" />
            </IconButton>
            </Toolbar>
        </AppBar>
    </Box>
    );
}