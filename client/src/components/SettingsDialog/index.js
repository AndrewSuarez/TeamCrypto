import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Modal from '../modal';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SettingsDialog = ({ open, handleClose, user }) => {
  const classes = useStyles();
  const [changePass, setChangePass] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword1, setNewPassword1] = useState('')
  const [newPassword2, setNewPassword2] = useState('')


  const createUser = (username, name, apellido, email, newPassword1) => {
    const userData = {
      nombre: name,
      apellido: apellido,
      username: username,
      email: email,
      password: newPassword1
    };

    return userData;
  };

  const handleUpdateData = () => {
    if(oldPassword){
      axios.post(`/api/auth/login`, {email: user.email, password: oldPassword})
      .then(() => {
        if(newPassword1 !== newPassword2){
          enqueueSnackbar('La nueva contraseña debe coincidir', {variant: 'warning'})
        }else{
          const userData = createUser(username, name, apellido, email, newPassword1);
          changeData(userData);
        }
      })
      .catch(error => {
        if(error.response){
          if(error.response.status === 400) enqueueSnackbar(error.response.data, {variant: 'warning'})
          else enqueueSnackbar('Ha ocurrido un error', {variant: 'error'})
        }
      })
    }else{
      const userData = createUser(username, name, apellido, email, newPassword1);
      changeData(userData);
    }
  };

  const handleDataChange = (e) => {
    const target = e.target;

    switch (target.name) {
      case 'userName':
        setUsername(e.target.value);
        break;
      case 'firstName':
        setName(e.target.value);
        break;
      case 'lastName':
        setApellido(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'oldPassword':
        setOldPassword(e.target.value)
        break;
      case 'newPassword1':
        setNewPassword1(e.target.value)
        break;
      case 'newPassword2':
        setNewPassword2(e.target.value)
        break;
      default:
        break;
    }
  };

  const handleChangePass = () => {
    setChangePass(true);
  };

  const closeModal = () => {
    setChangePass(false);
    handleClose();
  };

  const changeData = (userData) => {
    Object.getOwnPropertyNames(userData).forEach(
      function(val, idx, array){
        if (userData[val].length === 0) {
          console.log(userData[val].length)
          delete userData[val]
        }
      }
    )
    axios.put(`/api/users/${user._id}`, userData)
    .then(() => {
        enqueueSnackbar('Datos actualizados', { variant: 'success' });
      })
  };

  return (
    <Modal open={open} handleClose={closeModal} maxWidth='xs'>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Cambiar sus datos
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete='fuser'
                  onChange={handleDataChange}
                  name='userName'
                  variant='outlined'
                  fullWidth
                  id='userName'
                  label='Nombre de usuario'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='fname'
                  onChange={handleDataChange}
                  name='firstName'
                  variant='outlined'
                  fullWidth
                  id='firstName'
                  label='Nombre'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined'
                  onChange={handleDataChange}
                  fullWidth
                  id='lastName'
                  label='Apellido'
                  name='lastName'
                  autoComplete='lname'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  onChange={handleDataChange}
                  fullWidth
                  id='email'
                  label='Direccion Email'
                  name='email'
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  maxWidth={400}
                  variant='outlined'
                  onClick={handleChangePass}
                  color='secondary'
                  className={classes.submit}
                >
                  Cambiar contraseña
                </Button>
              </Grid>
              {changePass && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      fullWidth
                      name='oldPassword'
                      label='Contraseña Actual'
                      type='password'
                      id='oldPassword'
                      onChange={handleDataChange}
                      autoComplete='oldPassword'
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant='outlined'
                      fullWidth
                      name='newPassword1'
                      label='Nueva Contraseña'
                      type='password'
                      id='newPassword1'
                      onChange={handleDataChange}
                      autoComplete='newPassword1'
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant='outlined'
                      fullWidth
                      name='newPassword2'
                      label='Nueva Contraseña'
                      type='password'
                      id='newPassword2'
                      onChange={handleDataChange}
                      autoComplete='newPassword2'
                    />
                  </Grid>
                </>
              )}
            </Grid>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              onClick={handleUpdateData}
              className={classes.submit}
            >
              Guardar
            </Button>
          </form>
        </div>
      </Container>
    </Modal>
  );
};

SettingsDialog.propTypes = {
  open: PropTypes.any.isRequired,
  handleClose: PropTypes.any.isRequired,
};

export default SettingsDialog;
