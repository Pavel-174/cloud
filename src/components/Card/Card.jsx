import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import API from '../../utils/API';
import './Card.css';

function Card ({ id, name, mimeType, url, createdAt, setNumber, setFiles }) {

    const handleDelete = (e) => {
        e.stopPropagation();
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
    <li className='card'>
        { mimeType.includes('image/')  ? <img src={url} alt={name}/> : <DescriptionIcon fontSize='large'/> }
        <h3> {name} </h3>
        <span>{id}</span>
        <span>File type: {mimeType}</span>
        <span>{createdAt}</span>
        <button className='card__button' onClick={handleDelete}><DeleteIcon /></button>
    </li>
  )
}

export default Card;