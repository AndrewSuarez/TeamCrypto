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
  },
  icon: {
    opacity: 0.3,
  },
}));

const Verificate2FA = ({ history, location }) => {
  const classes = useStyles();
  const [dataError, setDataError] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [_2faCode, set_2faCode] = useState('');
  const [formButton, setFormButton] = useState('');
  const [checkPass, setCheckPass] = useState('');
  const [qrCode, setQrCode] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const JWT_SECRET =
    'aefecafac68bfcde5e27afe0a61e092ce2bdf718d666d387c7750b3e4373b6647cef92';
  const [verificationState, setVerificationState] = useState(
    location?.state?.user._2faEnabled
  );
  console.log(verificationState);
  console.log(location);

  useEffect(() => {
    if (verificationState) {
      setFormTitle('Ingresar el codigo de seguridad Google Auth');
      setFormButton('Verificar');
    } else {
      setFormTitle('Activar codigo de seguridad');
      setFormButton('Ver mi codigo QR');
    }
  }, [verificationState]);

  document.body.style = 'background: #FFFFFF;';

  useEffect(() => {
    const timer = setTimeout(() => {
      setDataError(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [dataError]);

  const activate2fa = () => {
    axios
      .post(`api/auth/activate-2fa/${location?.state?.user._id}`)
      .then((res) => {
        setVerificationState(true);
      });
  };

  const advanceWorkflow = () => {
    if (!verificationState) {
      window.open(link, '_blank');
      activate2fa();
      history.replace('2fa-verification');
    } else {
      validatePin(_2faCode, JWT_SECRET);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const link = `https://www.authenticatorApi.com/pair.aspx?AppName=TeamCrypto&AppInfo=Byron&SecretCode=${JWT_SECRET}`;

  const handleAccessChange = (e) => {
    const target = e.target;

    switch (target.name) {
      case 'code':
        set_2faCode(target.value);
        break;
      default:
        break;
    }
  };

  const validatePin = (pin, secretKey) => {
    axios.post(`/api/auth/request-2fa/${pin}/${secretKey}`).then((res) => {
      const data = res.data;

      if (data) {
        history.push('/chat');
      } else {
        enqueueSnackbar('El codigo de verificacion es incorrecto', {
          variant: 'warning',
        });
      }
    });
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
            {formTitle}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            {verificationState ? (
              <TextField
                variant='standard'
                margin='normal'
                error={dataError}
                label={dataError ? 'Error' : ''}
                helperText={dataError ? 'Verifique los datos' : ''}
                required
                fullWidth
                name='code'
                onChange={handleAccessChange}
                placeholder='Contraseña'
                type='password'
                id='code'
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
              <>
                <p>
                  Haz click en el siguente link, y escanea el codigo QR en tu
                  aplicacion de Google Authenticator
                </p>
              </>
            )}

            <Button
              type='submit'
              fullWidth
              variant='outlined'
              color='secondary'
              onClick={advanceWorkflow}
              className={classes.submit}
            >
              {formButton}
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

Verificate2FA.propTypes = {};

export default Verificate2FA;
