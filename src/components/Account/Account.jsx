import React, {useEffect, useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import LogoutIcon from '@mui/icons-material/Logout';
import API from '../../utils/API';
import "./Account.css";

function Account({ onSignOut }) {

    const [number, setNumber] = useState();
    const [files, setFiles] = useState([])

    useEffect(() => {
      API.getUserData()
        .then((data) => {
          setNumber(data.files.length);
          console.log(number);
        })
        .catch((error) => {
          console.log(`Ошибка сервера ${ error }`);
        });
    }, []);

    const onInputChange = (e) => {
      setFiles(e.target.files)
    };

    const onSubmit = (e, data) => {
      e.preventDefault();

        API
          .saveFile(data)
          .catch(() => {
            console.log("Mistake")
          });
    };

  return ( 
    <div className='account'>
      <div className='account__header-box'>
        <h2>Личный кабинет</h2> 
        <button onClick={ onSignOut } className='account__button-exit'><LogoutIcon fontSize='large'/></button>
      </div>
      <h3>Количество загруженных файлов: {number}/20</h3>
      <form method="post" action="#" id="#" onSubmit={onSubmit}>
            <div className="form-group files">
                <label>Upload Your File </label>
                <input type="file"
                       onChange={onInputChange}
                       className="form-control"
                       multiple/>
            </div>

            <button>Submit</button>
        </form>
    </div>
  )
}

export default Account;