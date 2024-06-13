import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios'
import NavBar from './components/NavBar'
import Footer from "./components/Footer";
import { ThemeProvider , createTheme } from '@mui/material/styles';
import Libros from "./components/Libros";
import AddForm from "./components/AddForm";
import UpdateForm from "./components/UpdateForm";
import { useState, useEffect } from "react";
import LibrosSearch from "./components/LibrosSearch";
import '@fontsource/roboto/700.css';

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

	/*** obtener libros de la db ****/
	const [db, setDb] = useState([]);
	useEffect(() => {
		obtenerLibros();
		}, []);
	const obtenerLibros = async () =>{
		const res = await axios.get("https://backendlibros-proyectofinal.onrender.com/get"),
		libros = res.data
		setDb(libros)
	}



	/*** guardar el valor que entra por el input del buscador ***/
	const [searchValue, setSearchValue] = useState('')

return (
    <ThemeProvider theme={greenTheme}>
        <div style={{ display: "block"}}>
			<BrowserRouter>
				<NavBar setSearchValue={setSearchValue} searchValue={searchValue} />
				<Routes>
					{
						!searchValue.length >= 1
						?	<Route path="/" element={<Libros db={db} obtenerLibros={obtenerLibros}/>}></Route>
						:	<Route path="/" element={<LibrosSearch searchValue={searchValue} db={db} obtenerLibros={obtenerLibros} />}></Route>
					}
					<Route path="/agregar" element={<AddForm />}></Route>
					<Route path="/editar/:id" element={<UpdateForm />}></Route>
				</Routes>
			</BrowserRouter>
			<Footer />
        </div>
    </ThemeProvider>
);
}

export default App;
