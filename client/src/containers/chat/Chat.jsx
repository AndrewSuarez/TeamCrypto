import './chat.css';

import react, { useContext, useEffect, useState } from 'react';

import AddBoxIcon from '@material-ui/icons/AddBox';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { AuthContext } from '../../context/AuthContext';
import CustomTabs from '../../components/CustomTabs';
import DeleteIcon from '@material-ui/icons/Delete';
import ElementsList from '../../components/ElementsList';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Group from './Group';
import Group1 from './chatTemporal/Group1';
import Group2 from './chatTemporal/Group2';
import LockIcon from '@material-ui/icons/Lock';
import Member from './Member';
import Member1 from './chatTemporal/Member1';
import Member3 from './chatTemporal/Member3';
import Member4 from './chatTemporal/Member4';
import Member5 from './chatTemporal/Member5';
import Member6 from './chatTemporal/Member6';
import Member7 from './chatTemporal/Member7';
import Member8 from './chatTemporal/Member8';
import Message from './Message';
import Modal from '../../components/modal';
import NavBar from '../../components/navbar';
import SendIcon from '@material-ui/icons/Send';
import Session from 'react-session-api';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import UserProfile from '../../objects/user';
import useStyles from './styles';

export default function Chat({ history, location }) {
  // const {user} = useContext(AuthContext)
  const classes = useStyles();
  const [openWorks, setOpenWorks] = useState(false);
  const [switchWorkItems, setSwitchWorkItems] = useState(0);

  const handleAddWorks = () => {
    setOpenWorks(true);
  };

  const onCloseAddWorks = () => {
    setOpenWorks(false);
  };

  const navOptions = [
    { label: 'Chat', direction: '/chat' },
    { label: <span onClick={handleAddWorks}>Tareas</span>, direction: '#' },
    { label: 'Contactos', direction: '#' },
    { label: 'Ajustes', direction: '/settings' },
    { label: 'Cerrar Sesion', direction: '/' },
  ];

  const handleTabClick = (value) => {
    console.log(value);
    setSwitchWorkItems(value);
  };

  const workItems = ['Tareas', 'Crear Tareas'];

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
                <AddBoxIcon />
              </div>
            </div>
            <Group />
            <Group1 />
            <Group2 />
          </div>
        </div>

        <div className='chatBox'>
          <div className='chatBoxWrapper'>
            <div className='chatBoxTop'>
              <nav className='chatNameWrapper'>
                <h1 className='chatName'>
                  Andres Suarez <LockIcon />
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
              <h1 className='chatGroupMemberBox'>Projecto Principal</h1>
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

      <Modal
        open={openWorks}
        title='Tareas de #IDGRUPO'
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
    </>
  );
}
