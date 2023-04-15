import axios from 'axios'
import {Link}  from "react-router-dom";
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography } from '@mui/material';
import CloudDownloadIcon  from '@mui/icons-material/CloudDownload';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CreateRoundedIcon    from '@mui/icons-material/CreateRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LanguageIcon from '@mui/icons-material/Language';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ImgEspañol from '../images/es.png'
import ImgIngles from '../images/en.png'
import noimg from '../images/noimg.jpg'
import Add from './Add';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
    })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
    }),
}));

const Es = () => (
    <img src={ImgEspañol} alt="spanish - español" width="30px" />
)
const En = () => (
    <img src={ImgIngles} alt="english - ingles" width="30px" />
)
const NotImg = () => (
    <img src={noimg} alt="" width="100%" style={{  objectFit: 'fill' }}  />
)


const LibrosSearch = ({searchValue}) => {


    const [data, setData] = useState([]);
    useEffect(() => {
        obtenerLibros();
        }, []);
    const obtenerLibros = async () =>{
        const Libros = (await axios.get("https://backend-proyectofinal-production.up.railway.app/get")).data
        setData(Libros)
    }

    let searchedBook = [];
    searchedBook = data.filter(book => {
        const bookTitle = book.title.toLowerCase();
        const bookAuthor = book.author.toLowerCase();
        let searchText = searchValue.toLowerCase();
        return bookTitle.includes(searchText) || bookAuthor.includes(searchText);           
    });

    const [expanded, setExpanded] = useState(null);


return (
    <>
        <Add />
        <Box style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly"}}>
            {
                searchedBook.map(item => {
                return(
                <Card sx={{ maxWidth: 335, boxShadow: "0px 10px 15px -3px rgb(203,147,67)", margin: "20px 10px", maxHeight: expanded === item._id ? 'maxContent' : 600, display: "flex", flexDirection: "column", justifyContent:"space-between", paddingBottom: "5px"  }} key={item._id} >
                    <CardHeader
                    avatar={
                    <Avatar aria-label="recipe">
                        {item.cover !== '' ? <img src={item.cover} alt="" width="100%" style={{  objectFit: 'fill' }}/> : <NotImg />}
                    </Avatar>
                    }
                    action={
                    <IconButton aria-label="download" color="primary">
                        {item.language === 'spanish' || item.language === 'Español' ? <Es /> : item.language === 'english' || item.language === 'Ingles' ? <En /> : <LanguageIcon />}
                    </IconButton>
                    }
                    title={item.title}
                    subheader={`${item.author} - ${item.publisher_date}`}
                    />
                    {
                        item.cover !== '' 
                        
                        ? <CardMedia
                            component="img"
                            height="275"
                            image={item.cover}
                            alt="cover"
                            title={item.language}
                            style={{  objectFit: 'fill' }}
                            />
                        : <CardMedia
                            component="img"
                            height="275"
                            image={noimg}
                            alt="cover"
                            title={item.language}
                            style={{  objectFit: 'fill' }}
                            />
                    }

                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                        {item.content_short}...
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="download" color="primary" href={item.url_download} target='_blank'>
                            <CloudDownloadIcon  fontSize='large' />
                        </IconButton>
                        <IconButton aria-label="add to favorites" color="primary">
                            <FavoriteIcon />
                        </IconButton>
                        <Link to={`/editar/${item._id}`} style={{textDecoration: "none"}}>
                            <IconButton aria-label="share" color="primary" >
                                <CreateRoundedIcon  />  
                            </IconButton>
                        </Link>
                        
                        <ExpandMore
                        onClick={() => setExpanded(expanded => expanded === item._id ? null : item._id)}
                        aria-expanded={expanded}
                        aria-label="show more"
                        >
                        { expanded === item._id
                            ? <ExpandMoreIcon color="primary" />
                            : <ExpandLessIcon color="primary" />
                        }
                        </ExpandMore>
                    </CardActions>
                    {
                    expanded === item._id &&
                    <Collapse in={expanded}  unmountOnExit >
                        <CardContent>
                        <Typography  variant="body2" sx={{ hyphens: "auto"}}>{item.content}</Typography>
                        </CardContent>
                    </Collapse>
                    }


                </Card>
                )
                })
            }
        </Box>
    </>

)
}

export default LibrosSearch