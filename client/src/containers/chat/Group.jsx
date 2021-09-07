import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import './group.css';
import reactLogo from '../../assets/images/reactLogo.png';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import EditGroupDialog from '../../components/EditGroupDialog';

export default function Group({
  group,
  usuario,
  miembros,
  role,
  acceptEditarGrupo,
  acceptDeleteMembers,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [editarOpen, setEditarOpen] = useState(false);
  const [eliminarOpen, setEliminarOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const deleteGroup = (groupId) => {
    axios.delete(`/api/groups/${groupId}/delete`).then((res) => {
      console.log(res.data);
      enqueueSnackbar('Grupo eliminado con exito', { variant: 'success' });
      window.location.replace('');
    });
  };

  const filter = usuario.contactos.filter(
    (o1) => !miembros.some((o2) => o1._id === o2.userId._id)
  );
  const groupMembers = miembros.map((miembro) => {
    return miembro.userId;
  });

  const handleEditarOpen = () => {
    setEditarOpen(true);
    setAnchorEl(null);
  };

  const handleEliminarOpen = () => {
    setEliminarOpen(true);
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    deleteGroup(group._id);
    setAnchorEl(null);
  };

  const handleEditarClose = () => {
    setEditarOpen(false);
  };

  const handleEliminarClose = () => {
    setEliminarOpen(false);
  };

  const handleAcceptEditar = (contactos, nombreGrupo) => {
    acceptEditarGrupo(contactos, nombreGrupo);
    handleEditarClose();
  };

  const handleAcceptBorrar = (miembros) => {
    acceptDeleteMembers(miembros);
    handleEliminarClose();
  };

  return (
    <div className='group'>
      <img className='groupImg' src={reactLogo} alt='' />
      <span className='groupName'>{group?.name}</span>
      <div className='groupSettingsIcon'>
        <MoreVertIcon onClick={handleClick} />
        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleEditarOpen}>Editar Grupo</MenuItem>
          <MenuItem onClick={handleEliminarOpen}>Eliminar Miembros</MenuItem>
          <MenuItem onClick={handleDelete}>Borrar Grupo</MenuItem>
        </Menu>
      </div>

      <EditGroupDialog
        open={editarOpen}
        handleClose={handleEditarClose}
        items={filter}
        borrar={false}
        handleAccept={handleAcceptEditar}
        title={'Editar Grupo'}
      />

      <EditGroupDialog
        open={eliminarOpen}
        handleClose={handleEliminarClose}
        items={groupMembers}
        borrar={true}
        handleAccept={handleAcceptBorrar}
        title={'Eliminar Miembros'}
      />
    </div>
  );
}
