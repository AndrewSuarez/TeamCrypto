import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Modal from '../modal';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles';
import TransferList from '../TransferList';

const EditGroupDialog = ({
  open,
  handleClose,
  items,
  acceptEditarGrupo,
  title,
}) => {
  const classes = useStyles();

  const [miembros, setMiembros] = useState([]);
  const [nombreGrupo, setNombreGrupo] = useState('');

  return (
    <Modal
      open={open}
      title={title}
      closeText='Cerrar'
      titleStyles={classes.title}
      disableBtn={miembros.length < 1 && nombreGrupo.length < 3}
      acceptText='Crear'
      handleClose={handleClose}
      onAccept={() => acceptEditarGrupo(miembros, nombreGrupo)}
      maxWidth='md'
    >
      <form className={classes.root} noValidate autoComplete='off'>
        <TextField
          label='Titulo del grupo'
          className={classes.groupTitle}
          onChange={(e) => setNombreGrupo(e.target.value)}
          required
        />
        <TransferList
          listStles={classes.members}
          contactos={items}
          setMiembros={setMiembros}
        />
      </form>
    </Modal>
  );
};

EditGroupDialog.propTypes = {
  open: PropTypes.any,
  handleClose: PropTypes.func,
  acceptEditarGrupo: PropTypes.func,
  title: PropTypes.string.isRequired,
};

export default EditGroupDialog;
