import React, { useState, useEffect } from 'react';

import Modal from '../../modal';
// import useStyles from './styles';
import ElementsList from '../../ElementsList';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { Radio, TextField } from '@material-ui/core';

const AddContactsDialog = ({ open, handleClose }) => {
  //   const classes = useStyles();

  const [userAvatar, setUserAvatar] = useState([]);
  const [users, setUsers] = useState([
    {
      avatar: userAvatar[0],
      title: 'Andres Suarez',
    },
    {
      avatar: userAvatar[1],
      title: 'Marielys Brijaldo',
    },
    {
      avatar: userAvatar[2],
      title: 'Eduardo Lopez',
    },
    {
      avatar: userAvatar[3],
      title: 'Eduardo Leon',
    },
  ]);
  const [firtsUsers, setFirstUsers] = useState(users);

  useEffect(() => {
    fetch('https://picsum.photos/v2/list?page=2&limit=4').then((res) => {
      return res.json().then((data) => {
        // console.log(data);
        setUserAvatar(data);
      });
    });
  }, []);

  const handleSearch = (e) => {
    const key = e.target.value;
    const listFilter = users.filter((i) => {
      return i.title.includes(key);
    });
    setUsers(listFilter);
  };

  return (
    <Modal
      open={open}
      title='Agregar un contacto'
      closeText='Cerrar'
      acceptText='Agregar'
      handleClose={handleClose}
      maxWidth='xs'
    >
      <form noValidate autoComplete='off'>
        <TextField
          required
          id='standard-required'
          label='Required'
          placeholder='Buscar un contacto por su nombre'
          onChange={handleSearch}
        />
        <ElementsList items={users} controlItem={<Radio />} />
      </form>
    </Modal>
  );
};

AddContactsDialog.propTypes = {
  items: PropTypes.array,
  avatars: PropTypes.array,
};

export default AddContactsDialog;
