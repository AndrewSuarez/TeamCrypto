import React, { useState, useEffect } from 'react';

import Modal from '../../modal';
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
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles';
import Search from '@material-ui/icons/Search';

const AddContactsDialog = ({ open, handleClose, handleAccept, noContacts, selectedUser, setSelectedUser }) => {
  const classes = useStyles();

  const [keyword, setKeyword] = useState('');
  const [users, setUsers] = useState([]);
  
  const originalUsers = noContacts.map(usuario => (
    {
      id: usuario._id, 
      avatar: usuario.profilePicture,
      title: `${usuario.nombre} ${usuario.apellido}` 
    }
  ))

  useEffect(() => {
        setUsers(originalUsers);
  }, []);

  const selectItems = (e) => {
    setSelectedUser(e.target.value)
  };

  const handleSearch = (key) => {
    const listFilter = users.filter((i) => {
      return i.title.includes(key);
    });
    setUsers(listFilter);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const key = e.target.value;
    if (key == '') {
      setUsers(originalUsers);
    }
    setKeyword(key);
  };

  return (
    <Modal
      open={open}
      title='Agregar un contacto'
      closeText='Cerrar'
      acceptText='Agregar'
      handleClose={handleClose}
      onAccept={handleAccept}
      maxWidth='xs'
    >
      <form noValidate autoComplete='off' className={classes.root}>
        <Input
          required
          placeholder='Buscar'
          className={classes.search}
          onChange={handleFilter}
          endAdornment={
            <InputAdornment className={classes.searchIcon}>
              <IconButton onClick={() => handleSearch(keyword)}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
        {users.map((user) => {
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

AddContactsDialog.propTypes = {
  open: PropTypes.any.isRequired,
  handleClose: PropTypes.any.isRequired,
};

export default AddContactsDialog;
