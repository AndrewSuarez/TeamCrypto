import React, { useState, useEffect } from 'react';

import Modal from '../modal';
// import useStyles from './styles';
import ElementsList from '../ElementsList';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import AddContactsDialog from './AddContactDialog';

const ContactsDialog = ({ open, handleClose, avatars }) => {
  //   const classes = useStyles();

  const [userAvatar, setUserAvatar] = useState([]);
  const [addContact, setAddContact] = useState(false);

  useEffect(() => {
    fetch('https://picsum.photos/v2/list?page=2&limit=4').then((res) => {
      return res.json().then((data) => {
        // console.log(data);
        setUserAvatar(data);
      });
    });
  }, []);

  const handleAddContact = () => {
    setAddContact(true);
  };
  const handleCloseAddContact = () => {
    setAddContact(false);
  };

  const items = [
    {
      avatar: userAvatar[0],
      title: 'Andres Suarez',
      children: <DeleteIcon />,
    },
    {
      avatar: userAvatar[1],
      title: 'Marielys Brijaldo',
      children: <DeleteIcon />,
    },
    {
      avatar: userAvatar[2],
      title: 'Eduardo Lopez',
      children: <DeleteIcon />,
    },
    {
      avatar: userAvatar[3],
      title: 'Eduardo Leon',
      children: <DeleteIcon />,
    },
  ];

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
      />
    </Modal>
  );
};

ContactsDialog.propTypes = {
  items: PropTypes.array,
  avatars: PropTypes.array,
};

export default ContactsDialog;
