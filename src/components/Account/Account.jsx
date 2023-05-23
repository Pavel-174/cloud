import React, {useEffect, useState} from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import API from '../../utils/API';
import "./Account.css";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import "@uppy/dashboard/dist/style.css";
import XHR from "@uppy/xhr-upload";
import Card from '../Card/Card';



function Account({ onSignOut }) {

    const [number, setNumber] = useState();
    const [files, setFiles] = useState([]);


    useEffect(() => {
      API.getUserData()
        .then((data) => {
          setNumber(data.files.length);
          setFiles(data.files);
        })
        .catch((error) => {
          console.log(`Ошибка сервера ${ error }`);
        });
    }, []);

    const uppy = new Uppy({
      restrictions: {
        maxNumberOfFiles: 20 - number,
        maxTotalFileSize: 1048576,
        allowedFileTypes: [
          "image/*",
          "application/*",
          "text/*",
        ],
      },
    });

    uppy.use(XHR, {
      endpoint: "https://job.kitactive.ru/api/media/upload",
      formData: true,
      fieldName: "files[]",
      headers: {
        Authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
    })
    .on("upload-success", (response) => {
      console.log(response);
      API.getUserData().then((data) => {
        setNumber(data.files.length);
        setFiles(data.files);
      })
    })
    .on("upload-error", (error) => {
      console.log(error);
    });

  return ( 
    <div className='account'>
      <div className='account__header-box'>
        <h2>Личный кабинет</h2> 
        <button onClick={ onSignOut } className='account__button-exit'><LogoutIcon fontSize='large'/></button>
      </div>
      <h3>Количество загруженных файлов: {number}/20</h3>
      <Dashboard uppy={uppy} disabled={number <= 20 ? false : true}/>
      <ul className='account__cards'>
          {files.map(file => (<Card key={file.id} id ={file.id} name={file.name} mimeType={file.mimeType} url={file.url} createdAt={file.createdAt} setNumber={setNumber} setFiles={setFiles}/>))}
      </ul>
    </div>
  )
}

export default Account;