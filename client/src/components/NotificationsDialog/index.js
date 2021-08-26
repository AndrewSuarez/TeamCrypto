import React, { useState, useEffect } from 'react';

import Modal from '../modal';
// import useStyles from './styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import { Radio, TextField } from '@material-ui/core';
import useStyles from './style';

const NotificationsDialog = ({ open, handleClose, usuario, aceptarSolicitud}) => {
  const classes = useStyles();

  const [selectedUser, setSelectedUser] = useState([])
  
  const users = usuario.solicitudes?.map(usuario => (
    {
      id: usuario._id, 
      avatar: usuario.profilePicture,
      title: `${usuario.nombre} ${usuario.apellido}` 
    }
  ))

  const selectItems = (e) => {
    setSelectedUser(e.target.value)
  };

  return (
    <Modal
      open={open}
      title='Aceptar una solicitud'
      closeText='Cerrar'
      acceptText='Agregar'
      handleClose={handleClose}
      onAccept={() => aceptarSolicitud(selectedUser)}
      maxWidth='xs'
    >
      <form noValidate autoComplete='off' className={classes.root}>

        {users?.map((user) => {
          return (
            <List className={classes.root}>
              <ListItem dense button>
                <ListItemText primary={user.title} />
                <ListItemSecondaryAction>
                  <Radio
                    value={user.id}
                    onClick={selectItems}
                    checked={user.id == selectedUser}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          );
        })}
      </form>
    </Modal>
  );
};

NotificationsDialog.propTypes = {
  open: PropTypes.any.isRequired,
  handleClose: PropTypes.any.isRequired,

};

export default NotificationsDialog;
