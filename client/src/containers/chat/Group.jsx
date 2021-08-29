import React, { useState } from 'react';
import './group.css';
import reactLogo from '../../assets/images/reactLogo.png';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function Group({ group }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
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
          <MenuItem onClick={handleClose}>Editar Grupo</MenuItem>
          <MenuItem onClick={handleClose}>Borrar Grupo</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
