import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import Modal from '../modal';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles';
import TransferList from '../TransferList';
import AccordionList from '../AccordionList';
import axios from 'axios';

const AssignRoleDialog = ({
  open,
  handleClose,
  userRole,
  memberId,
  fetchMembers,
}) => {
  const classes = useStyles();

  const [selectedRole, setSelectedRole] = useState('');

  const handleAccept = (userRole, memberId) => {
    if (userRole === 'A') {
      const assignRole = async () => {
        await axios
          .put(`/api/members/update/${memberId}`, { role: selectedRole })
          .then(fetchMembers());
      };
      assignRole();
    } else {
      console.log('Usted no tiene permisos para asignar roles');
    }
    handleClose();
  };

  const roles = [
    {
      label: 'Administrador',
      description:
        'Este rol tiene control total del equipo, puede crear tareas, asignarlas eliminarlas, agregar nuevos miembros a equipos, etc',
      id: 'A',
    },
    {
      label: 'Supervisor',
      description:
        'Este rol tiene control parcial del equipo, puede ver las tareas, no puede eliminarlas y puede asignar roles a otros miembros.',
      id: 'SP',
    },
    {
      label: 'Asistente',
      description:
        'Este rol tiene control solo en la seccion de tareas del equipo, puede crear tareas, eliminarlas, asignarlas y editarlas',
      id: 'ST',
    },
    {
      label: 'Manager',
      description:
        'Este rol puede crear un tipo especial de tareas, las reuniones o tareas que envian notificaciones a los usuarios involucrados',
      id: 'MG',
    },
  ];

  return (
    <Modal
      open={open}
      title='Asignar un rol'
      closeText='Cerrar'
      acceptText='Asignar'
      handleClose={handleClose}
      onAccept={() => handleAccept(userRole, memberId)}
      maxWidth='sm'
    >
      <form className={classes.root} noValidate autoComplete='off'>
        <AccordionList options={roles} setSelectedRole={setSelectedRole} />
      </form>
    </Modal>
  );
};

AssignRoleDialog.propTypes = {};

export default AssignRoleDialog;
