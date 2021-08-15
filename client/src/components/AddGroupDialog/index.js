import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Modal from '../modal';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles';
import TransferList from '../TransferList';

const AddGroupDialog = ({ open, handleClose }) => {
  const classes = useStyles();
  return (
    <Modal
      open={open}
      title='Crear un grupo'
      closeText='Cerrar'
      titleStyles={classes.title}
      acceptText='Crear'
      handleClose={handleClose}
      maxWidth='md'
    >
      <form className={classes.root} noValidate autoComplete='off'>
        <TextField label='Titulo del grupo' className={classes.groupTitle} />
        <TransferList listStles={classes.members} />
      </form>
    </Modal>
  );
};

AddGroupDialog.propTypes = {
  open: PropTypes.any,
  handleClose: PropTypes.func,
};

export default AddGroupDialog;
