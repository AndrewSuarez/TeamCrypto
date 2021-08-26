import React, { useState, useEffect } from 'react';

import Modal from '../modal';
// import useStyles from './styles';
import ElementsList from '../ElementsList';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import AddContactsDialog from './AddContactDialog';
import axios from 'axios';

const ContactsDialog = ({ open, handleClose, usuario, avatars }) => {
  //   const classes = useStyles();

  const [userAvatar, setUserAvatar] = useState([]);
  const [addContact, setAddContact] = useState(false);
  const [nonContacts, setNonContacts] = useState([])
  const [selectedUser, setSelectedUser] = useState([])

  useEffect(() => {
    try{
      const fetchNonContacts = async () => {
        const res = await axios.get('/api/users/noContacts/' + usuario._id)
        setNonContacts(res.data)
      }
      fetchNonContacts()
    }catch(err){
      console.log(err)
    }
  }, []);

  const handleAddContact = () => {
    setAddContact(true);
  };
  const handleCloseAddContact = () => {
    setAddContact(false);
  };

  const handleSolicitud = async (selectedUser) => {
    try{
      const res = await axios.put(`/api/users/${usuario._id}/solicitud`, {userId: selectedUser})
      console.log(res.data)
      handleClose()
    }catch(err){
      console.log(err)
    }
  }

  const items = usuario.contactos.map(contacto => (
    {
      avatar: contacto.profilePicture,
      title: `${contacto.nombre} ${contacto.apellido}`,
      children: <DeleteIcon />
    }
  ))
    // {
    //   avatar: userAvatar[0],
    //   title: 'Andres Suarez',
    //   children: <DeleteIcon />,
    // },
    // {
    //   avatar: userAvatar[1],
    //   title: 'Marielys Brijaldo',
    //   children: <DeleteIcon />,
    // },
    // {
    //   avatar: userAvatar[2],
    //   title: 'Eduardo Lopez',
    //   children: <DeleteIcon />,
    // },
    // {
    //   avatar: userAvatar[3],
    //   title: 'Eduardo Leon',
    //   children: <DeleteIcon />,
    // },
  

  return (
    <Modal
      open={open}
      title='Contactos'
      closeText='Cerrar'
      acceptText='Agregar'
      onAccept={handleAddContact}
      handleClose={handleClose}
      maxWidth='xs'
    >
      <ElementsList items={items} avatar={avatars ? avatars : userAvatar} />
      <AddContactsDialog
        open={addContact}
        handleClose={handleCloseAddContact}
        handleAccept={() => handleSolicitud(selectedUser)}
        noContacts={nonContacts}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </Modal>
  );
};

ContactsDialog.propTypes = {
  items: PropTypes.array,
  avatars: PropTypes.array,
};

export default ContactsDialog;
