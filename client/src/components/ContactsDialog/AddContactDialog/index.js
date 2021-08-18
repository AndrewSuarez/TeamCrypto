import React, { useState, useEffect } from 'react';

import Modal from '../../modal';
// import useStyles from './styles';
import ElementsList from '../../ElementsList';
import DeleteIcon from '@material-ui/icons/Delete';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import { Radio, TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles';
import Search from '@material-ui/icons/Search';

const AddContactsDialog = ({ open, handleClose }) => {
  const classes = useStyles();

  const [userAvatar, setUserAvatar] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([
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

  useEffect(() => {
    fetch('https://picsum.photos/v2/list?page=2&limit=4').then((res) => {
      return res.json().then((data) => {
        // console.log(data);
        setUserAvatar(data);
        setUsers(originalUsers);
      });
    });
  }, []);

  const selectItems = (e) => {
    setSelectedValue(e.target.value);
    console.log(e.target);
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
        <ElementsList
          items={users}
          controlItem={
            <Radio
              onClick={selectItems}
              checked={users.filter((user) => {
                return user == selectedValue;
              })}
            />
          }
        />
      </form>
    </Modal>
  );
};

AddContactsDialog.propTypes = {
  items: PropTypes.array,
  avatars: PropTypes.array,
};

export default AddContactsDialog;
