import * as React from 'react';
import {Link} from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton, Badge, InputBase  } from '@mui/material';
import Logo from '../images/logonew.png'
import Titulo from '../images/librosp.png'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import '@fontsource/roboto/500.css';
import { useEffect, useState } from 'react';

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
    <Box  sx={{ display: "flex", flexGrow: 1, flexDirection:"column", alignItems:"center" }}>
                {!matches &&
                    <Link to={`/`} style={{ flexGrow: 1 }}>
                        <Badge  
                        color="primary"
                        noWrap
                        height="100%"
                        sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', padding: 1 }}>
                            <img src={Logo} alt="logo libros" width={'60rem'} />
                            <img src={Titulo} alt="titulo" width={'70rem'} style={{ paddingLeft: "10px" }}/>
                        </Badge>
                    </Link>
                }
        <AppBar width="xl" position="static" color="transparent"  >
            <Toolbar >
                <Link to={`/`} style={{ flexGrow: 1 }}>
                    <Badge  
                    color="primary"
                    noWrap
                    height="100%"
                    sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'flex' }, alignItems: 'center', padding: 1 }}
                    >
                        {matches &&
                        <>
                        <img src={Logo} alt="logo libros" width={'70rem'} />
                        <img src={Titulo} alt="titulo" width={'90rem'} style={{ paddingLeft: "10px" }}/>
                        </>
                        }
                    </Badge>
                </Link>
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
            >
                <MenuIcon color="primary" />
            </IconButton>
            </Toolbar>
        </AppBar>
    </Box>
    );
}