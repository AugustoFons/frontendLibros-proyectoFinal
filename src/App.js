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
				light: '#65AD4F',
				main: '#65AD4F',
				dark: '#65AD4F',
				contrastText: '#fff',
			},    
			secondary: {
				light: '#D99054',
				main: '#D99054',
				dark: '#D99054',
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
