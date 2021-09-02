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
  borrar,
  handleAccept,
  title,
}) => {
  const classes = useStyles();

  const [miembros, setMiembros] = useState([]);
  const [nombreGrupo, setNombreGrupo] = useState('');
  const titulos = borrar
    ? { izquierda: 'Miembros', derecha: 'Borrar' }
    : { izquierda: 'Contactos', derecha: 'Nuevos Miembros' };

  return (
    <Modal
      open={open}
      title={title}
      closeText='Cerrar'
      titleStyles={classes.title}
      disableBtn={miembros.length < 1 && (nombreGrupo.length < 3 || borrar)}
      acceptText={borrar ? 'Eliminar' : 'Añadir'}
      handleClose={handleClose}
      onAccept={() => handleAccept(miembros, nombreGrupo)}
      maxWidth='md'
    >
      <form className={classes.root} noValidate autoComplete='off'>
        {!borrar && (
          <TextField
            label='Titulo del grupo'
            className={classes.groupTitle}
            onChange={(e) => setNombreGrupo(e.target.value)}
            required
          />
        )}
        <TransferList
          listStles={classes.members}
          contactos={items}
          setMiembros={setMiembros}
          titulos={titulos}
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
