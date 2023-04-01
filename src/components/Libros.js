import { Box } from '@mui/material'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography } from '@mui/material';
import CloudDownloadIcon  from '@mui/icons-material/CloudDownload';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LanguageIcon from '@mui/icons-material/Language';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ImgEspañol from '../images/es.png'
import ImgIngles from '../images/en.png'


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


const Libros = () => {

const [data, setData] = useState([]);
useEffect(() => {
    obtenerLibros();
    }, []);
const obtenerLibros = async () =>{
    const Libros = (await axios.get("http://localhost:8080/get")).data
    console.log(Libros)
    setData(Libros)
}


const [expanded, setExpanded] = useState(null);

/* const handleExpandClick = (id) => {
    setExpanded(id);
}; */



return (
    <Box style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly"}}>
        {
            data.map((item) => {
            return(
            <Card sx={{ maxWidth: 345, boxShadow: "0px 10px 15px -3px rgb(90,121,79)", margin: "20px 0px", maxHeight: expanded === item._id ? 'maxContent' : 610  }} key={item._id} >
                <CardHeader
                avatar={
                <Avatar aria-label="recipe">
                    <img src={item.cover} alt="" width="100%" style={{  objectFit: 'fill' }}/>
                </Avatar>
                }
                action={
                <IconButton aria-label="download" color="primary">
                    {item.language === 'spanish' || item.language === 'español' ? <Es /> : item.language === 'english' || item.language === 'ingles' ? <En /> : <LanguageIcon />}
                </IconButton>
                }
                title={item.title}
                subheader={`${item.author} - ${item.publisher_date}`}
                />
                <CardMedia
                    component="img"
                    height="300"
                    image={item.cover}
                    alt="Paella dish"
                    title={item.language}
                    style={{  objectFit: 'fill' }}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                    {item.content_short}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="download" color="primary">
                    <CloudDownloadIcon  fontSize='large' />
                    </IconButton>
                    <IconButton aria-label="add to favorites" color="primary">
                    <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share" color="primary">
                    <ShareIcon />
                    </IconButton>
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
                    <Typography paragraph>{item.content}</Typography>
                    </CardContent>
                </Collapse>
                }


            </Card>
        )
        })
        }
    </Box>
)
}

export default Libros