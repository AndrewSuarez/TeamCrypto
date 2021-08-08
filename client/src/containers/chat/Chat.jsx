import './chat.css';
import react, { useContext, useEffect } from 'react';

import Group from './Group';
import Member from './Member';
import Message from './Message';
import NavBar from '../../components/navbar';
import Session from 'react-session-api';
import UserProfile from '../../objects/user';
import LockIcon from '@material-ui/icons/Lock';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SendIcon from '@material-ui/icons/Send';
import AddBoxIcon from '@material-ui/icons/AddBox';


import Member1 from "./chatTemporal/Member1"
import Member3 from "./chatTemporal/Member3"
import Member4 from "./chatTemporal/Member4"
import Member5 from "./chatTemporal/Member5"
import Member6 from "./chatTemporal/Member6"
import Member7 from "./chatTemporal/Member7"
import Member8 from "./chatTemporal/Member8"

import Group1 from "./chatTemporal/Group1"
import Group2 from "./chatTemporal/Group2"
import { AuthContext } from '../../context/AuthContext';

export default function Chat({ history, location }) {

  // const {user} = useContext(AuthContext)

  useEffect(() => {
    // console.log(user);
  });
  return (
    <>
      <NavBar />
      <div className="chat">
        <div className="chatGroup"> 
          <div className="chatGroupWrapper">
            <div className="addGroup">
              <input placeholder="Buscar Grupo" className="chatGroupInput" />
              <div className="addGroupIcon">
                <AddBoxIcon />
              </div>
            </div>
            <Group />
            <Group1 />
            <Group2 />
          </div>
        </div>

        <div className="chatBox"> 
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <nav className="chatNameWrapper" >
                <h1 className="chatName">Andres Suarez <LockIcon /></h1>
              </nav>
            </div>
            <div className="chatBoxBottom">
              <textarea className="chatMessageInput" placeholder="Escriba algo..."></textarea>
              <div className="attachFile">
                <AttachFileIcon />
              </div>
              <button className="chatSubmitButton"> 
                <SendIcon />
              </button>
            </div>
          </div>
        </div>
                
        <div className="chatMember"> 
          <div className="chatMemberWrapper">
            <nav className="chatGroupNameWrapper">
              <h1 className="chatGroupMemberBox">Projecto Principal</h1>
            </nav>
            <Member />
            <Member1 />
            <Member3 />
            <Member4 />
            <Member5 />
            <Member6 />
            <Member7 />
            <Member8 />
          </div>
        </div>
      </div>
    </>
  );
}
