import './message.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import userIcon from '../../assets/images/userIcon.png';
import fileMessageIcon from '../../assets/images/fileMessageIcon.png';
import { format } from 'timeago.js';

export default function Message({ message, own, file }) {

  const imageValidation = /jpe?g|png|gif/;


  return (
    <div className={own ? 'message own' : 'message'}>
      {!own && <div className="senderName">{message.sender.nombre}</div> }
      <div className='messageTop'>
        <img className={!own && 'messageImg'} src={!own && userIcon} alt='' />
        <div className='messageBubble'>
          {imageValidation.test(message.fileName?.toLowerCase()) ? 
            <img className="imageInBubble" src={`/api/upload/image/${message.fileName}`} alt=''></img>
            :
            <>
              <img
              className={file && 'fileMessageImage'}
              src={file && fileMessageIcon}
              alt=''
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
