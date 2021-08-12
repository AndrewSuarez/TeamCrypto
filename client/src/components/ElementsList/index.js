import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from '@material-ui/icons/Folder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import useStyles from './style';

const ElementsList = ({ items }) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {items.map((i) => {
        return (
          <ListItem dense button>
            <ListItemText primary={i.title} secondary={i.description} />
            <ListItemSecondaryAction>
              <IconButton edge='end' aria-label='comments'>
                {i.children}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

ElementsList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default ElementsList;
