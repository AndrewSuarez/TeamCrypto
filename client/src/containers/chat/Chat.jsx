import './chat.css';
import useStyles from './styles';
import { useState, useEffect } from 'react';
import axios from 'axios';

import AttachFileIcon from '@material-ui/icons/AttachFile';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import LockIcon from '@material-ui/icons/Lock';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { Typography } from '@material-ui/core';

import Group from './Group';
import Member from './Member';
import Message from './Message';

import Modal from '../../components/modal';
import NavBar from '../../components/navbar';
import Session from 'react-session-api';
import UserProfile from '../../objects/user';
import ElementsList from '../../components/ElementsList';
import CustomTabs from '../../components/CustomTabs';
import AddGroupDialog from '../../components/AddGroupDialog';
import AssignRoleDialog from '../../components/AssignRoleDialog';
import ContactsDialog from '../../components/ContactsDialog';
import SettingsDialog from '../../components/SettingsDialog';

export default function Chat({ history, location }) {
  // variable temporal!!!
  const sessionId = '6105c08d1fbf991ef816593a';

  // const {user} = useContext(AuthContext)
  const classes = useStyles();
  const [openWorks, setOpenWorks] = useState(false);
  const [addGroup, setAddGroup] = useState(false);
  const [assignRoles, setAssignRoles] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [switchWorkItems, setSwitchWorkItems] = useState(0);
  const [seeContacts, setSeeContacts] = useState(false);

  const [groups, setGroups] = useState([]);
  const [currentMembers, setCurrentMembers] = useState([]);
  const [currentGroup, setCurrentGroup] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [chatGroup, setChatGroup] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const res = await axios.get('/api/members/groups/user/' + sessionId);
      setGroups(res.data);
    };
    fetchGroups();
  }, []);

  useEffect(() => {
    try {
      const fetchMembers = async () => {
        const res = await axios.get(
          `/api/members/${currentGroup._id}/${sessionId}`
        );
        setCurrentMembers(res.data);
      };
      fetchMembers();
    } catch (err) {
      console.log(err);
    }

    groupSetFunction();
  }, [currentGroup]);

  useEffect(() => {
    try {
      if (currentUser._id) {
        const fetchConversacion = async () => {
          const res = await axios.get(
            `/api/conversation/${currentGroup._id}/${sessionId}/${currentUser._id}`
          );
          if (res.data) {
            setConversation(res.data);
          } else {
            const nuevaConversacion = await axios.post(
              `/api/conversation/${currentGroup._id}`,
              {
                senderId: sessionId,
                receiverId: currentUser._id,
              }
            );
            setConversation(nuevaConversacion.data);
          }
        };
        fetchConversacion();
      }
    } catch (err) {
      console.log(err);
    }
  }, [currentUser]);

  useEffect(() => {
    if (conversation) {
      try {
        const fetchMensajes = async () => {
          const res = await axios.get(`/api/messages/${conversation._id}`);
          setMessages(res.data);
        };
        fetchMensajes();
      } catch (err) {
        console.log(err);
      }
    }
  }, [conversation]);

  const handleAddWorks = () => {
    setOpenWorks(true);
  };
  const handleAddGroups = () => {
    setAddGroup(true);
  };
  const handleAssignRoles = () => {
    setAssignRoles(true);
  };
  const handleSeeContacts = () => {
    setSeeContacts(true);
  };
  const handleOpenSettings = () => {
    setOpenSettings(true);
  };

  const navOptions = [
    { label: 'Chat', direction: '/chat' },
    {
      label: <span onClick={currentGroup._id && handleAddWorks}>Tareas</span>,
      direction: '#',
    },
    { label: <span onClick={handleSeeContacts}>Contactos</span> },
    { label: <span onClick={handleOpenSettings}>Ajustes</span> },
    { label: 'Cerrar Sesion', direction: '/' },
  ];

  const onCloseAddWorks = () => {
    setOpenWorks(false);
  };
  const onCloseAddGroups = () => {
    setAddGroup(false);
  };
  const onCloseAssignRoles = () => {
    setAssignRoles(false);
  };
  const onCloseSeeContacts = () => {
    setSeeContacts(false);
  };
  const onCloseSettings = () => {
    setOpenSettings(false);
  };

  const handleGroupClick = (group) => {
    setMessages([]);
    setConversation([]);
    setCurrentUser([]);
    if (group === currentGroup) {
      groupSetFunction();
    } else {
      setCurrentGroup(group);
    }
  };

  const groupSetFunction = () => {
    setChatGroup(true);
    try {
      const fetchConverGrupal = async () => {
        const res = await axios.get(`/api/conversation/${currentGroup._id}`);
        setConversation(res.data);
      };
      fetchConverGrupal();
    } catch (err) {
      console.log(err);
    }
  };

  const handleMemberClick = (member) => {
    setMessages([]);
    setChatGroup(false);
    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/users/' + member.userId);
        setCurrentUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  };

  const handleSendClick = async (e) => {
    e.preventDefault();
    const message = {
      conversationId: conversation._id,
      sender: sessionId,
      text: newMessage,
    };

    try {
      const res = await axios.post('/api/messages', message);
      setMessages([...messages, res.data]);
    } catch (err) {
      console.log(err);
    }
    document.getElementById('messagebox').value = '';
  };

  const workItems = ['Tareas', 'Crear Tareas'];

  const handleTabClick = (value) => {
    console.log(value);
    setSwitchWorkItems(value);
  };

  const itemsForWorks = [
    {
      title: 'Crear dialog de grupos',
      description: 'Asignado a: Andres Suarez.',
      children: <DeleteIcon />,
    },
    {
      title: 'Crear dialog de contactos',
      description: 'Asignado a: Andres Suarez.',
      children: <DeleteIcon />,
    },
    {
      title: 'Crear dialog de roles',
      description: 'Asignado a: Byron Miranda.',
      children: <DeleteIcon />,
    },
    {
      title: 'Crear dialog de Informacion',
      description: 'Asignado a: Byron Miranda.',
      children: <DeleteIcon />,
    },
  ];

  return (
    <>
      <NavBar options={navOptions} />
      <div className='chat'>
        <div className='chatGroup'>
          <div className='chatGroupWrapper'>
            <div className='addGroup'>
              <input placeholder='Buscar Grupo' className='chatGroupInput' />
              <div className='addGroupIcon'>
                <AddBoxIcon onClick={handleAddGroups} />
              </div>
            </div>
            {groups.map((g) => (
              <div onClick={() => handleGroupClick(g)}>
                <Group group={g} />
              </div>
            ))}
          </div>
        </div>

        <div className='chatBox'>
          <div className='chatBoxWrapper'>
            <div className='chatBoxTop'>
              <nav className='chatNameWrapper'>
                <h1 className='chatName'>
                  {chatGroup
                    ? currentGroup.name
                    : currentUser.nombre &&
                      `${currentUser.nombre} ${currentUser.apellido}`}
                  {currentUser.nombre && <LockIcon />}
                </h1>
              </nav>
              {messages.map((m) => (
                <div>
                  <Message message={m} own={m.sender === sessionId} />
                </div>
              ))}
            </div>
            <div className='chatBoxBottom'>
              <textarea
                id='messagebox'
                className='chatMessageInput'
                placeholder='Escriba algo...'
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              ></textarea>
              <div className='attachFile'>
                <AttachFileIcon />
              </div>
              <button className='chatSubmitButton' onClick={handleSendClick}>
                <SendIcon />
              </button>
            </div>
          </div>
        </div>
        <div className='chatMember'>
          <div className='chatMemberWrapper'>
            <nav className='chatGroupNameWrapper'>
              <h1 className='chatGroupMemberBox'>{currentGroup?.name}</h1>
            </nav>
            {currentGroup._id ? (
              currentMembers.map((m) => (
                <div
                  className='chatMemberRender'
                  onClick={() => handleMemberClick(m)}
                >
                  <Member member={m} handleMemberClick={handleAssignRoles} />
                </div>
              ))
            ) : (
              <span> Seleccione un grupo </span>
            )}
          </div>
        </div>
      </div>

      <Modal
        open={openWorks}
        title={`Tareas de ${currentGroup?.name}`}
        closeText='Cerrar'
        acceptText={'Aceptar'}
        handleClose={onCloseAddWorks}
        maxWidth={'xs'}
      >
        <CustomTabs options={workItems} handleClick={handleTabClick} />
        {switchWorkItems === 0 ? (
          <ElementsList items={itemsForWorks} />
        ) : (
          <Grid container xs={12}>
            <Paper className={classes.container}>
              <form className={classes.root} noValidate autoComplete='off'>
                <Grid item>
                  <TextField
                    id='outlined-basic'
                    label='Titulo'
                    variant='outlined'
                  />
                </Grid>
                <Grid item>
                  <InputLabel className={classes.label}>Asignar a:</InputLabel>
                  <Select className={classes.assign}>
                    <MenuItem value={10}>Andres</MenuItem>
                    <MenuItem value={20}>Byron</MenuItem>
                    <MenuItem value={30}>Marielys</MenuItem>
                  </Select>
                </Grid>
              </form>
            </Paper>
          </Grid>
        )}
      </Modal>
      <AddGroupDialog open={addGroup} handleClose={onCloseAddGroups} />
      <AssignRoleDialog open={assignRoles} handleClose={onCloseAssignRoles} />
      <ContactsDialog open={seeContacts} handleClose={onCloseSeeContacts} />
      <SettingsDialog open={openSettings} handleClose={onCloseSettings} />
    </>
  );
}
