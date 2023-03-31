import { Box } from '@mui/material'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';


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

const [expanded, setExpanded] = useState(false);

const handleExpandClick = () => {
    setExpanded(!expanded);
};

return (
    <Box style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly"}}>
        {
            data.map((item) => {
            return(
            <Card sx={{ maxWidth: 345, padding: "20px 0px" }} key={item._id}>
                <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                </Avatar>
                }
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                title={item.title}
                subheader={item.author}
                />
                <CardMedia
                    component="img"
                    height="200"
                    image={item.cover}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                    {item.content_short}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                    <ShareIcon />
                    </IconButton>
                    <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    >
                    <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                    <Typography paragraph>{item.content}</Typography>
                    </CardContent>
                </Collapse>
            </Card>
        )
        })
        }
    </Box>
)
}

export default Libros