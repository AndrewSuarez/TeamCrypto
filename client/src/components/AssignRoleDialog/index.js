import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Modal from '../modal';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles';
import TransferList from '../TransferList';
import AccordionList from '../AccordionList';

const AssignRoleDialog = ({ open, handleClose }) => {
  const classes = useStyles();

  const roles = [
    {
      label: 'Administrador',
      description:
        'Este rol tiene control total del equipo, puede crear tareas, asignarlas eliminarlas, agregar nuevos miembros a equipos, etc',
      id: 1,
    },
    {
      label: 'Supervisor',
      description:
        'Este rol tiene control parcial del equipo, puede ver las tareas, reasignarlas, no puede eliminarlas y puede asignar roles a otros miembros.',
      id: 2,
    },
    {
      label: 'Asistente',
      description:
        'Este rol tiene control solo en la seccion de tareas del equipo, puede crear tareas, eliminarlas, asignarlas y editarlas',
      id: 3,
    },
    {
      label: 'Manager',
      description:
        'Este rol puede crear un tipo especial de tareas, las reuniones o tareas que envian notificaciones a los usuarios involucrados',
      id: 4,
    },
  ];

  return (
    <Modal
      open={open}
      title='Asignar un rol'
      closeText='Cerrar'
      acceptText='Crear'
      handleClose={handleClose}
      maxWidth='sm'
    >
      <form className={classes.root} noValidate autoComplete='off'>
        <AccordionList options={roles} />
      </form>
    </Modal>
  );
};

AssignRoleDialog.propTypes = {};

export default AssignRoleDialog;
