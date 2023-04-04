import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar'
import { ThemeProvider , createTheme } from '@mui/material/styles';
import Libros from "./components/Libros";
import AddForm from "./components/AddForm";
import UpdateForm from "./components/UpdateForm";

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
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Libros />}></Route>
					<Route path="/agregar" element={<AddForm />}></Route>
					<Route path="/editar/:id" element={<UpdateForm />}></Route>
				</Routes>
			</BrowserRouter>
        </div>
    </ThemeProvider>

);
}

export default App;
