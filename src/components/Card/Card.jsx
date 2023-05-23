import React, {useEffect, useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import API from '../../utils/API';

function Card ({ id, setNumber, setFiles }) {

    console.log(id);

    const handleDelete = (e) => {
        e.stopPropagation(); // запрещаем всплытие
        const jwt = localStorage.getItem("token");
        API.removeCard(id)
        .then(() => {
            API.getUserData()
            .then((data) => {
              setNumber(data.files.length);
              setFiles(data.files);
            })
            .catch((error) => {
              console.log(`Ошибка сервера ${ error }`);
            });
        });
  }

  return ( 
    <li key={id}>{id} <button onClick={handleDelete}><DeleteIcon /></button></li>
  )
}

export default Card;