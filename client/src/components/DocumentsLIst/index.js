import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: '100%',
    height: 450,
  },
}));

const DocumentsList = ({ itemData }) => {
  const classes = useStyles();

  const getRandom = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  return (
    <div className={classes.root}>
      <ImageList rowHeight={160} className={classes.imageList} cols={3}>
        {itemData.map((item) => (
          <ImageListItem key={item.url} cols={1}>
            <img src={item.download_url} alt={item.author} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

DocumentsList.propTypes = {
  itemData: PropTypes.array,
};

export default DocumentsList;
