import React, { useState } from 'react';
import './group.css';
import reactLogo from '../../assets/images/reactLogo.png';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import EditGroupDialog from '../../components/EditGroupDialog';

export default function Group({ group, usuario, miembros, role, acceptEditarGrupo }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [editarOpen, setEditarOpen] = useState(false)
  const [eliminarOpen, setEliminarOpen] = useState(false)

  const filter = usuario.contactos.filter(o1 => !miembros.some(o2 => o1._id === o2.userId._id))
  const groupMembers = miembros.map(miembro => {
    return miembro.userId
  })
  
  const handleEditarOpen = () => {
    setEditarOpen(true)
    setAnchorEl(null)
  }

  const handleEliminarOpen = () => {
    setEliminarOpen(true)
    setAnchorEl(null)
  }
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditarClose = () => {
    setEditarOpen(false)
  }

  const handleEliminarClose = () => {
    setEliminarOpen(false)
  }

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
        </Menu>
      </div>

      <EditGroupDialog 
      open={editarOpen} 
      handleClose={handleEditarClose} 
      items={filter} 
      acceptEditarGrupo={acceptEditarGrupo}
      />

      <EditGroupDialog 
      open={eliminarOpen} 
      handleClose={handleEliminarClose} 
      items={groupMembers} 
      />
    </div>
  );
}
