import './chat.css';
import useStyles from './styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Session from 'react-session-api';
import UserProfile from '../../objects/user';

import AttachFileIcon from '@material-ui/icons/AttachFile';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import LockIcon from '@material-ui/icons/Lock';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
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
import ElementsList from '../../components/ElementsList';
import CustomTabs from '../../components/CustomTabs';
import AddGroupDialog from '../../components/AddGroupDialog';
import AssignRoleDialog from '../../components/AssignRoleDialog';
import ContactsDialog from '../../components/ContactsDialog';
import SettingsDialog from '../../components/SettingsDialog';
import NotificationsDialog from '../../components/NotificationsDialog';

export default function Chat({ history, location }) {
  // funciones y estado temporal!!! Se remplaza por el Session del log in
  const [sessionTemp, setSessionTemp] = useState([]);

  useEffect(() => {
    if (sessionTemp._id) {
      fetchGroups();
      fetchNonContacts();
    }
    if (sessionTemp.solicitudes?.length === 0) {
      setShowNotifications(false);
    } else setShowNotifications(true);
  }, [sessionTemp]);

  const fetchUser = async () => {
    try {
      const res = await axios.get('/api/users/6105c08d1fbf991ef816593a');
      setSessionTemp(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const {user} = useContext(AuthContext)
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [openWorks, setOpenWorks] = useState(false);
  const [addGroup, setAddGroup] = useState(false);
  const [assignRoles, setAssignRoles] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [switchWorkItems, setSwitchWorkItems] = useState(0);
  const [seeContacts, setSeeContacts] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [groups, setGroups] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [loggeduserGroupMember, setoggedUserGroupMember] = useState([]);
  const [currentGroup, setCurrentGroup] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [chatGroup, setChatGroup] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [nonContacts, setNonContacts] = useState([]);

  const [workTitle, setWorkTitle] = useState('');
  const [memberToWork, setMemberToWork] = useState('');

  //cambiar fetchUser por fetchGroups una vez se habilite el log in
  useEffect(() => {
    fetchUser();
    // fetchGroups();
  }, []);

  useEffect(() => {
    if (currentGroup._id) {
      fecthGroupMember();
      fetchMembers();
      groupSetFunction();
    }
  }, [currentGroup]);

  useEffect(() => {
    fetchConversacion();
  }, [selectedUser]);

  useEffect(() => {
    if (conversation) {
      fetchMensajes();
    }
  }, [conversation]);

  const fetchConversacion = async () => {
    try {
      if (selectedUser.userId) {
        const res = await axios.get(
          `/api/conversation/${currentGroup._id}/${sessionTemp._id}/${selectedUser.userId._id}`
        );
        if (res.data) {
          setConversation(res.data);
        } else {
          const nuevaConversacion = await axios.post(
            `/api/conversation/${currentGroup._id}`,
            {
              senderId: sessionTemp._id,
              receiverId: selectedUser.userId._id,
            }
          );
          setConversation(nuevaConversacion.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchConverGrupal = async () => {
    try {
      setChatGroup(true);
      const res = await axios.get(`/api/conversation/${currentGroup._id}`);
      setConversation(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fecthGroupMember = async () => {
    try {
      const res = await axios.get(
        `/api/members/group/user/${currentGroup._id}/${sessionTemp._id}`
      );
      setoggedUserGroupMember(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchGroups = async () => {
    const res = await axios.get('/api/members/groups/user/' + sessionTemp._id);
    setGroups(res.data);
  };

  const fetchMensajes = async () => {
    try {
      const res = await axios.get(`/api/messages/${conversation._id}`);
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMembers = async () => {
    setGroupMembers([]);
    try {
      const res = await axios.get(
        `/api/members/${currentGroup._id}/${sessionTemp._id}`
      );
      setGroupMembers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const assignWork = async (memberId, works) => {
    await axios
      .put(`/api/members/works/${memberId}`, { tareas: works })
      .then((res) => {
        console.log(res.data);
        fetchMembers();
      });
  };

  const deleteWork = async (memberId, work) => {
    await axios
      .put(`/api/members/${memberId}/tarea`, { tareas: work })
      .then((res) => {
        enqueueSnackbar('Tarea eliminada con exito', { variant: 'success' });
        fetchMembers();
      });
  };

  const fetchNonContacts = async () => {
    try {
      const res = await axios.get('/api/users/noContacts/' + sessionTemp._id);
      setNonContacts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const acceptSolicitud = async (userId) => {
    try {
      const res = await axios.put(`/api/users/${sessionTemp._id}/agregar`, {
        userId: userId,
      });
      console.log(res.data);
      onCloseNotifications();
      fetchUser();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCrearGrupo = async (usuario, miembros, nombreGrupo) => {
    try {
      const res = await axios.post('/api/groups', { name: nombreGrupo });
      const newMembers = [
        {
          groupId: res.data._id,
          userId: usuario._id,
          role: 'A',
        },
      ].concat(
        miembros.map((miembro) => ({
          groupId: res.data._id,
          userId: miembro._id,
        }))
      );
      axios.post('/api/members', newMembers).then(() => {
        onCloseAddGroups();
        fetchGroups();
      });
    } catch (err) {
      console.log(err);
    }
  };

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
  const handleAssignWork = () => {
    assignWork(memberToWork, workTitle);
    enqueueSnackbar('Tarea creada con exito', { variant: 'success' });
    setOpenWorks(false);
  };
  const handleOpenNotifications = () => {
    setOpenNotifications(true);
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
    showNotifications && {
      label: (
        <div className='notificacion' onClick={handleOpenNotifications}>
          {' '}
          <NotificationImportantIcon />{' '}
        </div>
      ),
    },
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
  const onCloseNotifications = () => {
    setOpenNotifications(false);
  };

  const groupSetFunction = () => {
    fetchConverGrupal();
  };

  const handleGroupClick = (group) => {
    setSelectedUser([]);
    if (group === currentGroup) {
      groupSetFunction();
    } else {
      setConversation([]);
      setMessages([]);
      setCurrentGroup(group);
    }
  };

  const handleMemberClick = (member) => {
    if (selectedUser.userId !== member.userId) {
      setMessages([]);
      setChatGroup(false);
      setSelectedUser(member);
    }
  };

  const handleSendClick = async (e) => {
    e.preventDefault();
    const message = {
      conversationId: conversation._id,
      sender: sessionTemp._id,
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

  const handleTabClick = (value) => {
    console.log(value);
    setSwitchWorkItems(value);
  };
  const handleChangeWorkTitle = (e) => {
    setWorkTitle(e.target.value);
  };
  const handleChangeAssignWork = (e) => {
    setMemberToWork(e.target.value);
  };

  const workItems = ['Tareas', 'Crear Tareas'];

  const mapWorkItems = (groupMembers) => {
    const workList = [];
    groupMembers.map((member) => {
      member.tareas.map((tarea) => {
        workList.push({
          title: tarea,
          description:
            'Asignada a:' + member.userId.nombre + ' ' + member.userId.apellido,
          children: (
            <DeleteIcon onClick={() => deleteWork(member._id, tarea)} />
          ),
        });
      });
    });
    return workList;
  };

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
                    : selectedUser.userId &&
                      `${selectedUser.userId.nombre} ${selectedUser.userId.apellido}`}
                  {selectedUser.userId && <LockIcon />}
                </h1>
              </nav>
              {messages.map((m) => (
                <div>
                  <Message
                    message={m}
                    own={
                      m.sender._id === sessionTemp._id ||
                      m.sender === sessionTemp._id
                    }
                  />
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
              groupMembers.map((m) => (
                <div
                  className='chatMemberRender'
                  onClick={() => handleMemberClick(m)}
                >
                  <Member
                    member={m}
                    handleMemberClick={handleAssignRoles}
                    selectedUser={selectedUser}
                  />
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
        acceptText={switchWorkItems == 1 && 'Aceptar'}
        handleClose={onCloseAddWorks}
        onAccept={handleAssignWork}
        maxWidth={'xs'}
      >
        <CustomTabs options={workItems} handleClick={handleTabClick} />
        {switchWorkItems === 0 ? (
          <ElementsList items={mapWorkItems(groupMembers)} />
        ) : (
          <Grid container className={classes.container}>
            <form className={classes.root} noValidate autoComplete='off'>
              <Grid item xs={12}>
                <TextField
                  id='outlined-basic'
                  className={classes.input}
                  label='Titulo'
                  variant='outlined'
                  onChange={handleChangeWorkTitle}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel className={classes.label}>Asignar a:</InputLabel>
                <Select
                  className={classes.assign}
                  onChange={handleChangeAssignWork}
                >
                  {groupMembers.map((m) => (
                    <MenuItem value={m._id}>
                      {m.userId.nombre + ' ' + m.userId.apellido}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </form>
          </Grid>
        )}
      </Modal>
      <AddGroupDialog
        open={addGroup}
        handleClose={onCloseAddGroups}
        usuario={sessionTemp}
        handleCrearGrupo={handleCrearGrupo}
      />

      <AssignRoleDialog
        open={assignRoles}
        handleClose={onCloseAssignRoles}
        userRole={loggeduserGroupMember?.role}
        memberId={selectedUser._id}
        fetchMembers={fetchMembers}
      />

      <ContactsDialog
        open={seeContacts}
        handleClose={onCloseSeeContacts}
        usuario={sessionTemp}
        nonContacts={nonContacts}
      />
      <SettingsDialog
        open={openSettings}
        handleClose={onCloseSettings}
        userId={sessionTemp._id}
      />
      <NotificationsDialog
        open={openNotifications}
        handleClose={onCloseNotifications}
        usuario={sessionTemp}
        aceptarSolicitud={acceptSolicitud}
      />
    </>
  );
}
