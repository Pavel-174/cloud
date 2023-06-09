import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import API from '../../utils/API';
import './Card.scss';
import fileDownload from 'js-file-download';

function Card ({ id, name, mimeType, fileName, url, createdAt, setNumber, setFiles }) {

    const handleDelete = (e) => {
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

    const handleDownload = (id) => {
        API.getCard(id)
        .then((response) => {
            fileDownload(response, fileName, mimeType) //для скачивания файлов использовал пакетное решение ('js-file-download')
        })
        .catch((error) => {
            console.log(`Ошибка сервера ${ error }`);
        });
    }

  return ( 
    <li className='card'>
        { mimeType.includes('image/')  ? // формат файла изображение ? отображаем картинку : отображаем иконку файла
          <img 
            className='card__image' 
            src={url} 
            alt={name} 
            onClick={handleDownload}
          /> 
          : 
          <DescriptionIcon 
            fontSize='large' 
            cursor='pointer' 
            onClick={handleDownload}
          /> 
        }
        <h3> {name} </h3>
        <span>{id}</span>
        <span>File type: {mimeType}</span>
        <span>{createdAt}</span>
        <button 
          className='card__button' 
          onClick={handleDelete}
        >
          <DeleteIcon fontSize='large'/>
        </button>
    </li>
  )
}

export default Card;