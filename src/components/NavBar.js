import * as React from 'react';
import {Link} from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton, Badge, InputBase, Typography  } from '@mui/material';
import Logo from '../images/logonew.png'
import Titulo from '../images/librosp.png'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
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

export default function SearchAppBar() {



    return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar width="xl" position="static" color="inherit" sx={{ padding: (2, 1, 0, 1) }}>
            <Toolbar >
                <Link to={`/`} style={{ flexGrow: 1 }}>
                    <Badge  
                    color="primary"
                    noWrap
                    height="100%"
                    sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'flex' }, alignItems: 'center' }}
                    >
                        <img src={Logo} alt="" width={'70rem'}/>
                        <img src={Titulo} alt="" width={'90rem'} style={{ paddingLeft: "10px" }}/> {/* fuente belleza */}
                    </Badge>
                </Link>
            <Search>
                <SearchIconWrapper>
                <SearchIcon color="primary" />
                </SearchIconWrapper>
                <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search',  sx: { color: "#5a794f" } }}
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