import React from "react";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AddForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('')
    const [contentShort, setContentShort] = useState('')
    const [publisherDate, setPublisherDate] = useState('')
    const [language, setLanguage] = useState('')
    const [cover, setCover] = useState('')
    const [urlDownload, setUrlDownload] = useState('')
    const navegar = useNavigate()

    function addBook(){
        const newBook = {
            title: titulo,
            author: escritor,
            content: descripcion,
            content_short: descripcion_corta,
            publisher_date: año,
            language: idioma,
            cover: imagen,
            url_download: descarga
        }
        axios.post('https://backend-proyectofinal-production.up.railway.app/get', newBook)
        .then(res => console.log(res.data))
        .then(err => console.log(err))
        alert('libro agregado')
        navegar(0)
    }

    return (
    <div>AddForm</div>
    )
}

export default AddForm