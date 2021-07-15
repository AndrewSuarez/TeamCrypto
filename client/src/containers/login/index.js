import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { InputAdornment } from '@material-ui/core';
import { PermIdentity } from '@material-ui/icons';
import Lock from '@material-ui/icons/LockOutlined';
import AppMenu from '../../components/appMenu';
import { BrowserRouter, Route } from 'react-router-dom';

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

export default function SignIn() {
  const classes = useStyles();
  document.body.style = 'background: #FFFFFF;';

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
            Iniciar Sesión
          </Typography>
          <form className={classes.form} noValidate>
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
                    <PermIdentity className={classes.icon} />
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
              Iniciar Sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {'¿No tienes cuenta aún? ¡Registrate!'}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}
