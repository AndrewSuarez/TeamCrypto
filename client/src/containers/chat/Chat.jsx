import './chat.css';

import react, { useEffect } from 'react';

import Group from './Group';
import Member from './Member';
import Message from './Message';
import NavBar from '../../components/navbar';
import Session from 'react-session-api';
import UserProfile from '../../objects/user';

export default function Chat({ history, location }) {
  useEffect(() => {
    console.log(Session.get('user'));
  });
  return (
    <>
      <NavBar />
      <div className='chat'>
        <div className='chatGroup'>
          <div className='chatGroupWrapper'>
            <input placeholder='Buscar Grupo' className='chatGroupInput' />
            <Group />
            <Group />
            <Group />
            <Group />
            <Group />
            <Group />
            <Group />
            <Group />
            <Group />
            <Group />
            <Group />
            <Group />
          </div>
        </div>

        <div className='chatBox'>
          <div className='chatBoxWrapper'>
            <div className='chatBoxTop'>
              <Message />
              <Message own={true} />
              <Message />
              <Message />
              <Message />
              <Message own={true} />
              <Message own={true} />
              <Message />
            </div>
            <div className='chatBoxBottom'>
              <textarea
                className='chatMessageInput'
                placeholder='Escriba algo...'
              ></textarea>
              <button className='chatSubmitButton'>Send</button>
            </div>
          </div>
        </div>

        <div className='chatMember'>
          <div className='chatMemberWrapper'>
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
          </div>
        </div>
      </div>
    </>
  );
}
