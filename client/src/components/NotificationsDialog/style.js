import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
  },
  search: {
    width: '95%',
    marginLeft: '10px',
  },
  searchIcon: {
    marginRight: '-1px',
  },
}));

export default useStyles;
