import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Modal from '../modal';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles';
import TransferList from '../TransferList';
import DocumentsList from '../DocumentsLIst';

const DocumentsDialog = ({ open, handleClose, items }) => {
  const classes = useStyles();
  return (
    <Modal
      open={open}
      title='Documentos'
      closeText='Cerrar'
      titleStyles={classes.title}
      handleClose={handleClose}
      maxWidth='md'
    >
      <DocumentsList itemData={items} />
    </Modal>
  );
};

DocumentsDialog.propTypes = {
  open: PropTypes.any,
  handleClose: PropTypes.func,
  items: PropTypes.array.isRequired,
};

export default DocumentsDialog;
