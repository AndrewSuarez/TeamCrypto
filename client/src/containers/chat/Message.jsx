import './message.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import userIcon from '../../assets/images/userIcon.png';
import fileMessageIcon from '../../assets/images/fileMessageIcon.png';
import { format } from 'timeago.js';
import download from 'js-file-download';

export default function Message({ message, own, file }) {

  const imageValidation = /jpe?g|png|gif/;

  const downloadFile = () => {
    try{
      axios.get(`/api/upload/download/${message.fileName}`, 
      {
       responseType:'arraybuffer'
      }
      )
      .then(res => {
        download(res.data, message.text);
      })
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className={own ? 'message own' : 'message'}>
      {!own && <div className="senderName">{message.sender.nombre}</div> }
      <div className='messageTop'>
        <img className={!own && 'messageImg'} src={!own && userIcon} alt='' />
        <div className='messageBubble'>
          {imageValidation.test(message.fileName?.toLowerCase()) ? 
            <img className="imageInBubble" src={`/api/upload/download/${message.fileName}`} alt=''></img>
            :
            <>
              <img
              className={file && 'fileMessageImage'}
              src={file && fileMessageIcon}
              alt='' 
              onClick={()=> downloadFile()}
              />
              <span className='messageText'>{message.text}</span>
            </>
          }
        </div>
      </div>
      <div className='messageBottom'>{format(message.createdAt)}</div>
    </div>
  );
}
