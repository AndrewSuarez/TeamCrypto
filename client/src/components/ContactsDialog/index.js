import React, { useState, useEffect } from 'react';

import Modal from '../modal';
// import useStyles from './styles';
import ElementsList from '../ElementsList';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import AddContactsDialog from './AddContactDialog';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import ConfirmDialog from '../ConfirmDialog';

const ContactsDialog = ({ open, handleClose, usuario, nonContacts, deleteContact, avatars }) => {
  //   const classes = useStyles();
  
  const [userAvatar, setUserAvatar] = useState([]);
  const [addContact, setAddContact] = useState(false);
  const [selectedUser, setSelectedUser] = useState([])
  const { enqueueSnackbar } = useSnackbar();
  const [id, setId] = useState([])

  const [deleteOpen, setDeleteOpen] = useState(false)
  
  useEffect(() => {
   
  }, []);

  const handleAddContact = () => {
    setAddContact(true);
  };
  const handleCloseAddContact = () => {
    setAddContact(false);
  };

  const handleDeleteOpen = (item) => {
    setId(item._id)
    setDeleteOpen(true)
  }

  const handleDeleteClose = () => {
    setDeleteOpen(false)
  }

  const handleConfirmDelete = (id) => {
    deleteContact(id)
    setDeleteOpen(false)
  }

  const handleSolicitud = (selectedUser) => {
      axios.put(`/api/users/${usuario._id}/solicitud`, {userId: selectedUser})
      .then(() => {
        handleCloseAddContact()
        enqueueSnackbar('Se ha enviado una solicitud al usuario', { variant: 'success' });
      })
      .catch(error => {
        if(error.response && error.response.status === 405){
          enqueueSnackbar('Este usuario ya tiene una solicitud pendiente', {variant: 'warning'})
        }else{
          enqueueSnackbar('Ha ocurrido un error', {variant: 'error'})
        }
      })
      
  }

  const items = usuario.contactos?.map(contacto => (
    {
      avatar: contacto.profilePicture,
      title: `${contacto.nombre} ${contacto.apellido}`,
      _id: contacto._id,
      children: <DeleteIcon />
    }
  ))
  
  return (
    <>
      <Modal
        open={open}
        title='Contactos'
        closeText='Cerrar'
        acceptText='Agregar'
        onAccept={handleAddContact}
        handleClose={handleClose}
        maxWidth='xs'
      >
        <ElementsList items={items} avatar={avatars ? avatars : userAvatar} handleDialogOpen={handleDeleteOpen}/>
        <AddContactsDialog
          open={addContact}
          handleClose={handleCloseAddContact}
          handleAccept={() => handleSolicitud(selectedUser)}
          noContacts={nonContacts}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </Modal>
      <ConfirmDialog 
      open={deleteOpen}
      handleClose={handleDeleteClose}
      id={id}
      handleConfirm={handleConfirmDelete} 
      />
    </>
  );
};

ContactsDialog.propTypes = {
  items: PropTypes.array,
  avatars: PropTypes.array,
};

export default ContactsDialog;
