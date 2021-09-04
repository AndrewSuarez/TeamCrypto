import {
  BrowserRouter,
  Link,
  Route,
  useParams,
  withRouter,
} from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';

import AppMenu from '../../components/appMenu';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
import Container from '@material-ui/core/Container';
import CreateIcon from '@material-ui/icons/Create';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { InputAdornment } from '@material-ui/core';
import Lock from '@material-ui/icons/LockOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { PermIdentity } from '@material-ui/icons';
import PropTypes from 'prop-types';
import Session from 'react-session-api';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import UserProfile from '../../objects/user';
import { makeStyles } from '@material-ui/core/styles';
import tryLogin from '../../api/login';

import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#0C0F2A',
    color: '#5B88C6',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: '#0C0F2A',
  },
  icon: {
    opacity: 0.3,
  },
}));

const SignIn = ({ history, location }) => {
  const classes = useStyles();
  const [access, setAccess] = useState();
  const [dataError, setDataError] = useState(false);
  const [loginText, setLoginText] = useState('');
  const [checkPass, setCheckPass] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const { user, error, dispatch } = useContext(AuthContext);
  let { login } = useParams();

  document.body.style = 'background: #FFFFFF;';

  useEffect(() => {
    const timer = setTimeout(() => {
      setDataError(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [dataError]);

  const loginCall2 = async (userCredential) => {
    await axios
      .post('/api/auth/login', userCredential)
      .then((res) => {
        console.log(res);
        const data = res.data;
        if (data.status == 'success') {
          history.push('/chat');
        } else {
          enqueueSnackbar(data.message, { variant: 'error' });
        }
      })
      .catch((err) => {
        console.error(err);
        setDataError(true);
        enqueueSnackbar('Datos incorrectos', { variant: 'error' });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkPass != UserProfile.getPassword()) {
      enqueueSnackbar('Las contraseñas no coinciden', { variant: 'error' });
      return;
    }

    Session.set('user', UserProfile);
    loginCall2({
      email: UserProfile.getEmail(),
      password: UserProfile.getPassword(),
    });
  };

  const handleAccessChange = (e) => {
    const target = e.target;

    switch (target.name) {
      case 'email':
        UserProfile.setEmail(target.value);
        break;
      case 'password':
        UserProfile.setPassword(target.value);
        break;
      case 'passwordTwo':
        setCheckPass(e.target.value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (login === 'login') {
      setAccess(true);
      setLoginText('Iniciar Sesión');
      console.log(access);
    } else {
      setAccess(false);
      setLoginText('Registrarse');
      console.log(access);
    }
  }, [login]);

  return (
    <>
      <AppMenu />
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            {loginText}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            {!access ? (
              <TextField
                variant='standard'
                margin='normal'
                required
                fullWidth
                id='username'
                onChange={handleAccessChange}
                placeholder='Nombre de Usuario'
                name='username'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PermIdentity className={classes.icon} />
                    </InputAdornment>
                  ),
                }}
              />
            ) : (
              <></>
            )}
            {!access ? (
              <TextField
                variant='standard'
                margin='normal'
                required
                fullWidth
                id='name'
                placeholder='Nombre'
                name='name'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <CreateIcon className={classes.icon} />
                    </InputAdornment>
                  ),
                }}
              />
            ) : (
              <></>
            )}
            {!access ? (
              <TextField
                variant='standard'
                margin='normal'
                required
                fullWidth
                id='lastName'
                placeholder='Apellido'
                name='lastName'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <CreateIcon className={classes.icon} />
                    </InputAdornment>
                  ),
                }}
              />
            ) : (
              <></>
            )}
            <TextField
              variant='standard'
              type='email'
              error={dataError}
              label={dataError ? 'Error' : ''}
              helperText={dataError ? 'Verifique los datos' : ''}
              margin='normal'
              required
              fullWidth
              id='email'
              placeholder='Correo Electronico'
              onChange={handleAccessChange}
              name='email'
              autoComplete='email'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <MailOutlineIcon className={classes.icon} />
                  </InputAdornment>
                ),
              }}
              autoFocus
            />
            <TextField
              variant='standard'
              margin='normal'
              error={dataError}
              label={dataError ? 'Error' : ''}
              helperText={dataError ? 'Verifique los datos' : ''}
              required
              fullWidth
              name='password'
              onChange={handleAccessChange}
              placeholder='Contraseña'
              type='password'
              id='password'
              autoComplete='current-password'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Lock className={classes.icon} />
                  </InputAdornment>
                ),
              }}
            />
            {!access ? (
              <TextField
                variant='standard'
                margin='normal'
                error={dataError}
                label={dataError ? 'Error' : ''}
                helperText={dataError ? 'Verifique los datos' : ''}
                required
                fullWidth
                name='passwordTwo'
                onChange={handleAccessChange}
                placeholder='Contraseña'
                type='password'
                id='password'
                autoComplete='current-password'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Lock className={classes.icon} />
                    </InputAdornment>
                  ),
                }}
              />
            ) : (
              <></>
            )}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              {loginText}
            </Button>
            <Grid container>
              {access ? (
                <Grid item xs>
                  <Link href='#' variant='body2'>
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Grid>
              ) : (
                <></>
              )}
              <Grid item>
                {access ? (
                  <Link to='/access/signup' variant='body2'>
                    ¿No tienes cuenta aún? ¡Registrate!
                  </Link>
                ) : (
                  <Link to='/access/login' variant='body2'>
                    ¿Ya tienes una cuenta?
                  </Link>
                )}
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

SignIn.propTypes = {};

export default SignIn;
