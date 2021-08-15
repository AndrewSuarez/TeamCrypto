import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import useStyles from './style';

const Modal = ({
  open,
  handleClose,
  title,
  children,
  closeText,
  acceptText,
  onAccept,
  titleStyles,
  maxWidth,
}) => {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={maxWidth}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title' className={titleStyles} >{title}</DialogTitle>
        <DialogContent className={classes.root}>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            {closeText}
          </Button>
          <Button onClick={onAccept} color='primary'>
            {acceptText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  children: PropTypes.any.isRequired,
  titleStyles: PropTypes.any.isRequired,
  closeText: PropTypes.string.isRequired,
  acceptText: PropTypes.string.isRequired,
  onAccept: PropTypes.func,
  maxWidth: PropTypes.string,
};

export default Modal;
