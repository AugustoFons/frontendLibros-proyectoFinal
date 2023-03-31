import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from './components/Add';
import NavBar from './components/NavBar'
import { ThemeProvider , createTheme } from '@mui/material/styles';
import { Box } from '@mui/material'
import Libros from "./components/Libros";

function App() {
	const greenTheme = createTheme({
		palette: {
			primary: {
				light: '#5a794f',
				main: '#5a794f',
				dark: '#5a794f',
				contrastText: '#fff',
			},    
		}
    })

return (
    <ThemeProvider theme={greenTheme}>
        <div style={{ display: "block"}}>
			<NavBar />
			<Box style={{ display: "flex", justifyContent:"center", padding:"20px"}}>
				<Add />
			</Box>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Libros />}></Route>
				</Routes>
			</BrowserRouter>
        </div>
    </ThemeProvider>

);
}

export default App;
