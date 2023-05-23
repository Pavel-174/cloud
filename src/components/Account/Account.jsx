import React, {useEffect, useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import API from '../../utils/API';
import "./Account.css";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import "@uppy/dashboard/dist/style.css";
import XHR from "@uppy/xhr-upload";



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
      <Dashboard uppy={uppy} disabled={true}/>
      <ul>
          {files.map(file => (<li key={file.id}>{file.id} <button><DeleteIcon/></button></li>))}
      </ul>
    </div>
  )
}

export default Account;