import './chat.css';
import useStyles from './styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Session from 'react-session-api';
import UserProfile from '../../objects/user';
import ReactScrollableFeed from 'react-scrollable-feed'

import IconButton from '@material-ui/core/IconButton';
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
import Button from '@material-ui/core/Button';
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
import ProgressBar from '../../components/ProgressBar';

export default function Chat({ history, location }) {
  // funciones y estado temporal!!! Se remplaza por el Session del log in
  const [user, setUser] = useState([]);

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
  const [porcentajeUpload, setPorcentajeUpload] = useState(0)

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
  const [files, setFiles] = useState(null);

  let objDiv = document.getElementById("scrollBox");

  useEffect(() => {
    console.log(Session.get('user'))
    fetchUser();
  }, []);

  useEffect(() => {
    if (user._id) {
      fetchGroups();
      fetchNonContacts();
    }
    if (user.solicitudes?.length === 0) {
      setShowNotifications(false);
    } else setShowNotifications(true);
  }, [user]);

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
      fetchFiles();
    }
  }, [conversation]);

  const fetchConversacion = async () => {
    try {
      if (selectedUser.userId) {
        const res = await axios.get(
          `/api/conversation/${currentGroup._id}/${user._id}/${selectedUser.userId._id}`
        );
        if (res.data) {
          setConversation(res.data);
        } else {
          const nuevaConversacion = await axios.post(
            `/api/conversation/${currentGroup._id}`,
            {
              senderId: user._id,
              receiverId: selectedUser.userId._id,
            }
          );
          setConversation(nuevaConversacion.data);
        }
      }
    } catch (err) {
      enqueueSnackbar('Ha ocurrido un error', { variant: 'error' });
      console.log(err)
    }
  };

  const fetchConverGrupal = async () => {
    try {
      setChatGroup(true);
      const res = await axios.get(`/api/conversation/${currentGroup._id}`);
      setConversation(res.data);
    } catch (err) {
      enqueueSnackbar('Ha ocurrido un error', { variant: 'error' });
      console.log(err)
    }
  };

  const fecthGroupMember = async () => {
    try {
      const res = await axios.get(
        `/api/members/group/user/${currentGroup._id}/${user._id}`
      );
      setoggedUserGroupMember(res.data);
    } catch (err) {
      enqueueSnackbar('Ha ocurrido un error', { variant: 'error' });
      console.log(err)
    }
  };

  const fetchGroups = async () => {
    const res = await axios.get('/api/members/groups/user/' + user._id);
    setGroups(res.data);

  };

  const fetchFiles = async () => {
    const { data } = await axios.get(
      `/api/messages/allFiles/${conversation._id}`
    );
    setFiles(data);
  };
  
  const fetchMensajes = async () => {
    try {
      const res = await axios.get(`/api/messages/${conversation._id}`);
      setMessages(res.data);
      if(conversation._id) objDiv.scrollTop = objDiv.scrollHeight;
    } catch (err) {
      enqueueSnackbar('Ha ocurrido un error', { variant: 'error' });
      console.log(err)
    }
  };

  const fetchMembers = async () => {
    setGroupMembers([]);
    try {
      const res = await axios.get(
        `/api/members/${currentGroup._id}/${user._id}`
      );
      setGroupMembers(res.data);
    } catch (err) {
      enqueueSnackbar('Ha ocurrido un error', { variant: 'error' });
      console.log(err)
    }
  };

  const fetchUser = async () => {
    const loginUser = Session.get('user')
    try {
      const res = await axios.get(`/api/users/${loginUser._id}`);
      setUser(res.data);
    } catch (err) {
      enqueueSnackbar('Ha ocurrido un error', { variant: 'error' });
      console.log(err)
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
      const res = await axios.get('/api/users/noContacts/' + user._id);
      setNonContacts(res.data);
    } catch (err) {
      enqueueSnackbar('Ha ocurrido un error', { variant: 'error' });
      console.log(err)
    }
  };

  const addMembers = async (newMembers) => {
    axios.post('/api/members', newMembers).then(() => {
      onCloseAddGroups();
    });
  };

  const deleteMembers = async (idArray) => {
    const query = { groupId: currentGroup._id, userId: idArray };
    await axios.post('/api/members/deleteMany', query);
  };

  const changeGroupName = async (name) => {
    try {
      await axios.put(`/api/groups/${currentGroup._id}`, { name: name });
    } catch (err) {
      enqueueSnackbar('Ha ocurrido un error', { variant: 'error' });
      console.log(err)
    }
  };

  const acceptSolicitud = async (userId) => {
    try {
      const res = await axios.put(`/api/users/${user._id}/agregar`, {
        userId: userId,
      });
      console.log(res.data);
      onCloseNotifications();
      enqueueSnackbar('Contacto Agregado', { variant: 'success' });
      fetchUser();
    } catch (err) {
      enqueueSnackbar('Ha ocurrido un error', { variant: 'error' });
      console.log(err)
    }
  };



  const postMessage = async (mensaje) => {
    try {
      const res = await axios.post('/api/messages', mensaje);
      setMessages([...messages, res.data]);
      objDiv.scrollTop = objDiv.scrollHeight;
    } catch (err) {
      enqueueSnackbar('Ha ocurrido un error', { variant: 'error' });
      console.log(err)
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
      const conver = await axios.post(`/api/conversation/groupchat/${res.data._id}`)
      console.log(conver)
      addMembers(newMembers);
      fetchGroups();

      enqueueSnackbar('Se ha creado un grupo exitosamente', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar('Ha ocurrido un error', { variant: 'error' });
      console.log(err)
    }
  };

  const handleAddMembers = async (members, nameGroup) => {
    try {
      if (nameGroup.length >= 3) {
        changeGroupName(nameGroup);
      }
      if (members.length >= 1) {
        const newMembers = members.map((miembro) => ({
          groupId: currentGroup._id,
          userId: miembro._id,
        }));
        addMembers(newMembers);
        enqueueSnackbar('Grupo Editado', { variant: 'success' });
        fetchMembers();
      }
    } catch (err) {
      enqueueSnackbar('Ha ocurrido un error', { variant: 'error' });
      console.log(err)
    }
  };

  const handleDeleteMembers = async (selectedMembers) => {
    try {
      const idArray = selectedMembers.map((member) => {
        return member._id;
      });
      deleteMembers(idArray);
      enqueueSnackbar('Se han eliminado los miembros del grupo', { variant: 'success' });
      fetchMembers();
    } catch (err) {
      enqueueSnackbar('Ha ocurrido un error', { variant: 'error' });
      console.log(err)
    }
  };

  const deleteGroup = (groupId) => {
    axios.delete(`/api/groups/${groupId}/delete`).then((res) => {
      console.log(res.data);
      enqueueSnackbar('Grupo eliminado con exito', { variant: 'success' });
      setGroupMembers([])
      setConversation([])
      setMessages([])
      setChatGroup(false)
      fetchGroups()
    });
  };

  const deleteContact = (contactId) => {
    axios.put(`/api/users/${user._id}/delete`, {userId: contactId})
    .then(() => {
      enqueueSnackbar('contacto Eliminado', { variant: 'success' });
      fetchUser()
    }).catch((error) => {
      enqueueSnackbar('Ha ocurrido un error', {variant: 'error'})
    })
  }

  const handleAddWorks = () => {
    setOpenWorks(true);
  };
  const handleAddGroups = () => {
    setAddGroup(true);
  };

  const handleAssignRoles = () => {
    if (loggeduserGroupMember.role === 'A' || loggeduserGroupMember.role === "SP") {
      setAssignRoles(true);
    } else {
      enqueueSnackbar(
        'Usted no tiene permisos para asignar roles, comuniquese con el administrador',
        { variant: 'warning' }
      );
    }
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

  const handleCerrarSesion = () => {
    enqueueSnackbar('Sesion Cerrada', {variant: 'info'})
    history.push('/')
  }

  const navOptions = [
    { label: 'Chat', direction: '/chat' },
    {
      label: <span onClick={currentGroup._id && handleAddWorks}>Tareas</span>,
      direction: '#',
    },
    { label: <span onClick={handleSeeContacts}>Contactos</span> },
    { label: <span onClick={handleOpenSettings}>Ajustes</span> },
    { label: <span onClick={handleCerrarSesion}>Cerrar Sesion</span> },
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
      sender: user._id,
      text: newMessage,
    };
    postMessage(message);
    setNewMessage([]);
    document.getElementById('messagebox').value = '';
  };

  const handleTabClick = (value) => {
      setSwitchWorkItems(value);
  };
  const handleChangeWorkTitle = (e) => {
    setWorkTitle(e.target.value);
  };
  const handleChangeAssignWork = (e) => {
    setMemberToWork(e.target.value);
  };
  const handleChangeFile = async (e) => {
    if (conversation._id && e.target.files) {
      try {
        const data = new FormData();
        data.append('file', e.target.files[0]);
        const res = await axios.post('/api/upload', data, {
          onUploadProgress: ProgressEvent => {
            setPorcentajeUpload(parseInt(Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)))
          }
        });
        const message = {
          conversationId: conversation._id,
          sender: user._id,
          text: res.data.file.originalname,
          fileName: res.data.file.filename,
        };
        postMessage(message);
        setPorcentajeUpload(0)
        fetchFiles();
      } catch (err) {
        enqueueSnackbar('Ha ocurrido un error', { variant: 'error' });
        console.log(err)
      }
    }
  };

  const workItems =  ['Tareas', 'Crear Tareas'];

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
                <Group
                  group={g}
                  usuario={user}
                  miembros={groupMembers}
                  role={loggeduserGroupMember?.role}
                  acceptEditarGrupo={handleAddMembers}
                  acceptDeleteMembers={handleDeleteMembers}
                  deleteGroup={deleteGroup}
                />
              </div>
            ))}
          </div>
        </div>

        <div className='chatBox' >
          <div className='chatBoxWrapper'>
            <div className='chatBoxTop' id={"scrollBox"}>
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
                        m.sender._id === user._id ||
                        m.sender === user._id
                      }
                      file={m.fileName && true}
                    />
                  </div>
                ))}
                {(porcentajeUpload > 0) ? <ProgressBar percentage={porcentajeUpload} /> : undefined}
            </div>
            <div className='chatBoxBottom'>
              <textarea
                id='messagebox'
                className='chatMessageInput'
                placeholder='Escriba algo...'
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              ></textarea>
              <input
                className={classes.files}
                id='contained-button-file'
                name='file'
                type='file'
                disabled={porcentajeUpload !== 0 || currentGroup.length === 0}
                onInput={(e) => handleChangeFile(e)}
              />
              <label htmlFor='contained-button-file'>
                <IconButton color='primary' component='span'>
                  <AttachFileIcon />
                </IconButton>
              </label>
              <button
                className='chatSubmitButton'
                onClick={handleSendClick}
                disabled={!(newMessage.length !== 0)}
              >
                <SendIcon />
              </button>
            </div>
          </div>
        </div>
        <div className='chatMember'>
          <div className='chatMemberWrapper'>
            <nav className='chatGroupNameWrapper'>
              <h1 className='chatGroupMemberBox'>{currentGroup.name}</h1>
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
                    files={files}
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
        <CustomTabs options={workItems} handleClick={handleTabClick} 
        disabled={(loggeduserGroupMember?.role === 'MG' || loggeduserGroupMember?.role === '') && (switchWorkItems === 0)}/>
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
        usuario={user}
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
        usuario={user}
        nonContacts={nonContacts}
        deleteContact={deleteContact}
      />
      <SettingsDialog
        open={openSettings}
        handleClose={onCloseSettings}
        user={user}
      />
      <NotificationsDialog
        open={openNotifications}
        handleClose={onCloseNotifications}
        usuario={user}
        aceptarSolicitud={acceptSolicitud}
      />
    </>
  );
}
