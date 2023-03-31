import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import '@fontsource/roboto/700.css';

const Add = () => {
return (
    <>
        <Button color="primary" variant="contained"  sx={{ alignSelf: 'center'  ,borderRadius: "80px", padding: "0px 15px 0px 0px", letterSpacing: "1.5px"}}
            startIcon={
            <Fab variant="filledTonal">
            <AddIcon color="primary" variant="outline"/>
            </Fab>
            }
        >
        colaborar
    </Button>
    </>

    )
}

export default Add