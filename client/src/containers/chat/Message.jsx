import './message.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import userIcon from '../../assets/images/userIcon.png';
import fileMessageIcon from '../../assets/images/fileMessageIcon.png';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { format } from 'timeago.js';

export default function Message({ message, own, file }) {

  const [sender, setSender] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/users/' + message.sender);
        setSender(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [])

  return (
    <div className={own ? 'message own' : 'message'}>
      {!own && <div className="senderName">{sender.nombre}</div> }
      <div className='messageTop'>
        <img className={!own && 'messageImg'} src={!own && userIcon} alt='' />
        <div className='messageBubble'>
          <img
            className={file && 'fileMessageImage'}
            src={file && fileMessageIcon}
            alt=''
          />
          <span className='messageText'>{message.text}</span>
        </div>
      </div>
      <div className='messageBottom'>{format(message.createdAt)}</div>
    </div>
  );
}
