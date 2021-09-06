import {
  BrowserRouter,
  Link,
  Route,
  useParams,
  withRouter,
} from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import AppMenu from '../../components/appMenu';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { InputAdornment } from '@material-ui/core';
import Lock from '@material-ui/icons/LockOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import UserProfile from '../../objects/user';
import { makeStyles } from '@material-ui/core/styles';

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

const ResetPassword = ({ history, location }) => {
  const classes = useStyles();
  const [dataError, setDataError] = useState(false);
  const [checkPass, setCheckPass] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const { token } = useParams();

  document.body.style = 'background: #FFFFFF;';

  useEffect(() => {
    const timer = setTimeout(() => {
      setDataError(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [dataError]);

  const resetUserPass = async () => {
    await axios
      .post('/api/auth/reset-password', {
        resetLink: token,
        newPass: UserProfile.getPassword(),
      })
      .then((res) => {
        const data = res.data;
        enqueueSnackbar(data.message, { variant: 'success' });
        history.push('/access/login');
      })
      .catch((err) => {
        console.log(err);
        setDataError(true);
        enqueueSnackbar('El token es incorrecto o ya expiro.', {
          variant: 'error',
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkPass != UserProfile.getPassword()) {
      enqueueSnackbar('Las contraseñas no coinciden', { variant: 'error' });
      setDataError(true);
      return;
    }

    resetUserPass();
  };

  const handleAccessChange = (e) => {
    const target = e.target;

    switch (target.name) {
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
            Cambiar contraseña de acceso
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
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

            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Cambiar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to='/access/login' variant='body2'>
                  Regresar
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

ResetPassword.propTypes = {};

export default ResetPassword;
