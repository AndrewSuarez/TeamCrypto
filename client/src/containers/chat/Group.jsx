import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import './group.css';
import reactLogo from '../../assets/images/reactLogo.png';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function Group({ group }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const deleteGroup = (groupId) => {
    axios.delete(`/api/groups/${groupId}/delete`).then((res) => {
      console.log(res.data);
      enqueueSnackbar('Grupo eliminado con exito', { variant: 'success' });
      window.location.replace('');
    });
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
          <MenuItem onClick={handleEdit}>Editar Grupo</MenuItem>
          <MenuItem onClick={handleDelete}>Borrar Grupo</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
