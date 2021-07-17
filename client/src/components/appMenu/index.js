import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './style';

export default function AppMenu() {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" className={classes.AppBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            CryptoChat
          </Typography>
          <div className={classes.menuOptions}>
            <Button color="inherit" className={classes.option}>
              <Link to="/">Inicio</Link>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
