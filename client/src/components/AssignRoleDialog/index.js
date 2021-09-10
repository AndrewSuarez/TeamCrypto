import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import Modal from '../modal';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles';
import TransferList from '../TransferList';
import AccordionList from '../AccordionList';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const AssignRoleDialog = ({
  open,
  handleClose,
  userRole,
  memberId,
  fetchMembers,
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [selectedRole, setSelectedRole] = useState('');

  const handleAccept = (userRole, memberId) => {
    if ((userRole === 'SP') && (selectedRole === 'A')) {
      enqueueSnackbar('Usted no tiene permisos para asignar el rol de administrador a otro usuario', {variant: 'warning'})
    } else {
      const assignRole = async () => {
        await axios.put(`/api/members/update/${memberId}`, { role: selectedRole })
        enqueueSnackbar('Rol asignado con exito', {variant: 'success'})
        fetchMembers()
      };
      assignRole();
    }
    handleClose();
  };

  const roles = [
    {
      label: 'Administrador "A"',
      description:
        'Este rol tiene control total del equipo,',
      id: 'A',
    },
    {
      label: 'Supervisor "SP"',
      description:
        'Puede Asignar tareas y asignar otros roles excepto administrador a otros usuarios.',
      id: 'SP',
    },
    {
      label: 'Asistente "ST"',
      description:
        'Puede asignar tareas',
      id: 'ST',
    },
    {
      label: 'Manager "MG"',
      description:
        'Puede editar los miembros del grupo',
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
