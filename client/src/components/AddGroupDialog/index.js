import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Modal from '../modal';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles';
import TransferList from '../TransferList';

const AddGroupDialog = ({ open, handleClose, usuario, handleCrearGrupo }) => {
  const classes = useStyles();

  const [miembros, setMiembros] = useState([]);
  const [nombreGrupo, setNombreGrupo] = useState([]);
  const titulos = {izquierda: "Contactos", derecha: "Agregar Miembros"}

  return (
    <Modal
      open={open}
      title='Crear un grupo'
      closeText='Cerrar'
      titleStyles={classes.title}
      disableBtn={!(miembros.length >= 1 && nombreGrupo.length >= 3)}
      acceptText='Crear'
      handleClose={handleClose}
      onAccept={() => handleCrearGrupo(usuario, miembros, nombreGrupo)}
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
          contactos={usuario.contactos}
          setMiembros={setMiembros}
          titulos={titulos}
        />
      </form>
    </Modal>
  );
};

AddGroupDialog.propTypes = {
  open: PropTypes.any,
  handleClose: PropTypes.func,
};

export default AddGroupDialog;
