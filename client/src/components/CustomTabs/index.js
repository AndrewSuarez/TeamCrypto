import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import useStyles from './style';

const CustomTabs = ({ options, handleClick, disabled }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        centered
      >
        {options.map((tab) => {
          return <Tab label={tab} onClick={handleClick(value)} disabled={disabled}/>;
        })}
      </Tabs>
    </Paper>
  );
};

CustomTabs.propTypes = {
  options: PropTypes.array.isRequired,
  handleClick: PropTypes.func,
};

export default CustomTabs;
