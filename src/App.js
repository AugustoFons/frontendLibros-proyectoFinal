import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios'
import NavBar from './components/NavBar'
import { ThemeProvider , createTheme } from '@mui/material/styles';
import Libros from "./components/Libros";
import AddForm from "./components/AddForm";
import UpdateForm from "./components/UpdateForm";
import { useState, useEffect } from "react";
import LibrosSearch from "./components/LibrosSearch";

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
	const [data, setData] = useState([]);
	useEffect(() => {
		obtenerLibros();
		}, []);
	const obtenerLibros = async () =>{
		const Libros = (await axios.get("https://backend-proyectofinal-production.up.railway.app/get")).data
		setData(Libros)
	}

	/*** guardar el valor que entra por el input del buscador ***/
	const [searchValue, setSearchValue] = useState('')
	console.log(searchValue)

return (
    <ThemeProvider theme={greenTheme}>
        <div style={{ display: "block"}}>
			<BrowserRouter>
				<NavBar setSearchValue={setSearchValue} searchValue={searchValue} />
				<Routes>
					{
						!searchValue.length >= 1
						?	<Route path="/" element={<Libros data={data}/>}></Route>
						:	<Route path="/" element={<LibrosSearch searchValue={searchValue} data={data} />}></Route>

					}
					<Route path="/agregar" element={<AddForm />}></Route>
					<Route path="/editar/:id" element={<UpdateForm />}></Route>
				</Routes>
			</BrowserRouter>
        </div>
    </ThemeProvider>

);
}

export default App;
