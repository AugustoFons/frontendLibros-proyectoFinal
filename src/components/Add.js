import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import { Box } from '@mui/material'
import {Link}  from "react-router-dom";

const Add = () => {
return (
    <Box style={{ display: "flex", justifyContent:"center", padding:"30px 20px 10px 20px"}}>
        <Link to={`/agregar`} style={{textDecoration: "none"}}>
        <Button  variant="contained"  sx={{ alignSelf: 'center'  ,borderRadius: "80px", padding: "0px 15px 0px 0px", letterSpacing: "1.5px"}}
            startIcon={
            <Fab variant="filled" sx={{color: "#D99054"}} >
            <AddIcon color="primary"  variant="outline"/>
            </Fab>
            }
        >
        colaborar
    </Button>
        </Link>
    </Box>
    )
}

export default Add