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

export default function Chat({ history, location }) {
  // const {user} = useContext(AuthContext)
  const classes = useStyles();
  const [openWorks, setOpenWorks] = useState(false);
  const [addGroup, setAddGroup] = useState(false);
  const [assignRoles, setAssignRoles] = useState(true);
  const [switchWorkItems, setSwitchWorkItems] = useState(0);

  const [groups, setGroups] = useState([]);
  const [currentMembers, setCurrentMembers] = useState([]);
  const [currentGroup, setCurrentGroup] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const res = await axios.get('/api/members/user/6105c08d1fbf991ef816593a');
      setGroups(res.data);
    };
    fetchGroups();
  }, []);

  useEffect(() => {
    try {
      const fetchMembers = async () => {
        const res = await axios.get('/api/members/' + currentGroup._id);
        setCurrentMembers(res.data);
      };
      fetchMembers();
    } catch (err) {
      console.log(err);
    }
  }, [currentGroup]);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  const handleAddWorks = () => {
    setOpenWorks(true);
  };
  const handleAddGroups = () => {
    setAddGroup(true);
  };

  const navOptions = [
    { label: 'Chat', direction: '/chat' },
    {
      label: <span onClick={currentGroup._id && handleAddWorks}>Tareas</span>,
      direction: '#',
    },
    { label: 'Contactos', direction: '#' },
    { label: 'Ajustes', direction: '/settings' },
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

  const handleGroupClick = (group) => {
    setCurrentUser([]);
    setCurrentGroup(group);
  };

  const handleMemberClick = (member) => {
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
                  {currentUser.nombre &&
                    `${currentUser.nombre} ${currentUser.apellido}`}
                  {currentUser.nombre && <LockIcon />}
                </h1>
              </nav>
            </div>
            <div className='chatBoxBottom'>
              <textarea
                className='chatMessageInput'
                placeholder='Escriba algo...'
              ></textarea>
              <div className='attachFile'>
                <AttachFileIcon />
              </div>
              <button className='chatSubmitButton'>
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
                  <Member member={m} />
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
    </>
  );
}
