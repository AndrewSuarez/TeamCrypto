import React, { useState, useEffect } from 'react';
import './styles.css'

import Modal from '../modal';
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    IconButton,
    Typography,
  } from '@material-ui/core';
  import { Close } from '@material-ui/icons';


const ConfirmDialog = ({ open, handleClose, id, handleConfirm }) => {
return (
    <Modal
      open={open}
      title=''
      handleClose={handleClose}
      maxWidth='xs'
    >
    <DialogTitle>¿Seguro que quiere eliminar este elemento?</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton>
          <Close onClick={handleClose}/>
        </IconButton>
      </Box>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={handleClose}>
          Cancelar
        </Button>
        <Button color="secondary" variant="contained" onClick={() => handleConfirm(id)}>
          Confirmar
        </Button>
      </DialogActions>
    </Modal>
  );
};

ConfirmDialog.propTypes = {

};

export default ConfirmDialog;
