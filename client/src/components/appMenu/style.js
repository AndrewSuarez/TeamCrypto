import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  AppBar: {
    background: '#0C0F2A',
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  menuOption: {
    justify: 'center',
  },
  option: {
    fontFamily: 'Helvetica Neue',
  },
}));

export default useStyles;
