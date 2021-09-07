import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import GetAppIcon from '@material-ui/icons/GetApp';
import axios from 'axios';
import download from 'js-file-download';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  imageList: {
    padding: theme.spacing(2),
    minHeight: '100',
    minWidth: '100%',
    maxHeight: 'auto',
    maxWidth: 'auto',
    float: 'left',
  },
  downloadFileIcon: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    cursor: 'pointer'
  },
  img: {
    maxWidth: '100%',
    maxHeight: '100%'
  },
  text: {
    maxWidth: '100%',
    maxHeight: '100%',
    textAlign: 'center',
  }
}));



const DocumentsList = ({ itemData }) => {
  const classes = useStyles();
  const imageValidation = /(.jpe?g|.png|.gif)$/

  const downloadFile = (item) => {
    try{
      axios.get(`/api/upload/download/${item.fileName}`, 
      {
       responseType:'arraybuffer'
      }
      )
      .then(res => {
        download(res.data, item.text);
      })
    }catch(err){
      console.log(err)
    }
  }
  
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {itemData.map((item) => (
            <Grid item xs={4}>
              <div className={classes.imageList}>
              {imageValidation.test(item.fileName?.toLowerCase()) ? 
                <img className={classes.img} src={`/api/upload/download/${item.fileName}`} alt={item.text} /> 
                :
                <p className={classes.text}>{item.text}</p>
              }
              </div>
                <GetAppIcon className={classes.downloadFileIcon} onClick={() => downloadFile(item)}/>
            </Grid>
        ))}
      </Grid>
    </div>
  );
};

DocumentsList.propTypes = {
  itemData: PropTypes.array,
};

export default DocumentsList;
