import { Link }  from "react-router-dom";
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography, Stack, CircularProgress } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import LanguageIcon from '@mui/icons-material/Language';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ImgEspañol from '../images/es.png'
import ImgIngles from '../images/en.png'
import noimg from '../images/noimg.jpg'
import Add from './Add';
import ModelComments from './modalComments';
import Pagination from '@mui/material/Pagination';

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

const Libros = ({db, obtenerLibros}) => {

    const [expanded, setExpanded] = useState(null); //estado para expandir la descripcion

    /*** PAGINACION  ***/
    let pages = Math.ceil(db.length/12)
    const [page, setPage] = useState(1);
    const [countInit, setCountInit] = useState(0);
    const [countEnd, setCountEnd] = useState(12);

    const handleChange = (event, value) => {
        setPage(value);
        if(value !== page) {
            setCountEnd(12 * value);
            setCountInit(12*(value-1));
        }
        document.getElementById('lista').scrollIntoView();
    };

    return (
    <>
        <Add />
        <Box id='lista' style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly"}}>
            { [...db].length !== 0  //esta condicion es par mostrar el loading antes de que se carge la base de datos
            ?
                [...db].reverse().slice(countInit,countEnd).map((item) => {
                return(
                    item.comments[0] === 'aprobado' ?   //esta condicion esta hecha para que cuando algun usuario agregue un libro solo pueda aparecer en la seccion principal si su primer comentario es 'aprobado' , esto solo lo puede hacer el administrador desde la base de datos.

                <Card sx={{ maxWidth: 315, boxShadow: "0px 10px 15px -3px rgb(203,147,67)", margin: "20px 10px", maxHeight: expanded === item._id ? 'maxContent' : 630, display: "flex", flexDirection: "column", justifyContent:"space-between", paddingBottom: "5px"  }} key={item._id} >
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
                            height="275px"
                            image={item.cover}
                            alt="cover"
                            title={item.language}
                            style={{  objectFit: 'fill' }}
                            />
                        : <CardMedia
                            component="img"
                            height="265px"
                            image={noimg}
                            alt="cover"
                            title={item.language}
                            style={{  objectFit: 'fill' }}
                            />
                    }

                    <CardContent sx={{ overflow: "hidden" }}>
                        <Typography variant="body2" color="text.secondary">
                        {item.content_short}...
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="download" color="primary" href={item.url_download} target='_blank'>
                            <CloudDownloadIcon fontSize='large' />
                        </IconButton>
                        <IconButton aria-label="add to favorites" color="primary">
                            <ModelComments item={item} title={item.title} obtenerLibros={obtenerLibros}/>
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

                : null
                )
                })
                :
                <Stack sx={{ color: 'grey.500', marginTop: '70px' }} spacing={2} direction="row">
                    <CircularProgress color="secondary" />
                </Stack>
            }
        
        </Box>
        <Box>
            <Stack mt={4} >
                <Pagination count={pages} page={page} color="primary" onChange={handleChange} size='large' sx={{display: 'flex', justifyContent: 'center', columnGap: '15px'}} />
            </Stack>
        </Box>

    </>
    )
}

export default Libros