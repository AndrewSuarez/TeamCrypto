import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CreateIcon from '@material-ui/icons/Create';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { InputAdornment } from '@material-ui/core';
import { PermIdentity } from '@material-ui/icons';
import Lock from '@material-ui/icons/LockOutlined';
import AppMenu from '../../components/appMenu';
import { BrowserRouter, Route, useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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

const handleClick = () => {
  console.log('You clicked this');
};

const SignIn = () => {
  const classes = useStyles();
  const [access, setAccess] = useState();
  const [loginText, setLoginText] = useState('');
  let { login } = useParams();
  document.body.style = 'background: #FFFFFF;';

  useEffect(() => {
    if (login == 'login') {
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {loginText}
          </Typography>
          <form className={classes.form} noValidate>
            {!access ? (
              <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                id="username"
                placeholder="Nombre de Usuario"
                name="username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
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
                variant="standard"
                margin="normal"
                required
                fullWidth
                id="name"
                placeholder="Nombre"
                name="name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
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
                variant="standard"
                margin="normal"
                required
                fullWidth
                id="lastName"
                placeholder="Apellido"
                name="lastName"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreateIcon className={classes.icon} />
                    </InputAdornment>
                  ),
                }}
              />
            ) : (
              <></>
            )}
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="email"
              placeholder="Correo Electronico"
              name="email"
              autoComplete="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon className={classes.icon} />
                  </InputAdornment>
                ),
              }}
              autoFocus
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock className={classes.icon} />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => handleClick}
            >
              {loginText}
            </Button>
            <Grid container>
              {access ? (
                <Grid item xs>
                  <Link href="#" variant="body2">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Grid>
              ) : (
                <></>
              )}
              <Grid item>
                {access ? (
                  <Link to="/access/signup" variant="body2">
                    ¿No tienes cuenta aún? ¡Registrate!
                  </Link>
                ) : (
                  <Link to="/access/login" variant="body2">
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
