import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';

const AccordionList = ({ options }) => {
  const classes = useStyles();

  const [selectedValue, setSelectedValue] = useState(0);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const CustomRadio = withStyles({
    root: {
      color: '#4B2B95',
      '&$checked': {
        color: '#56579F',
      },
    },
    checked: {
      color: '#56579F',
    },
  })((props) => <Radio color='default' {...props} />);

  return (
    <div className={classes.root}>
      {options.map((element) => {
        return (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label='Expand'
              aria-controls='additional-actions1-content'
              id='additional-actions1-header'
            >
              <FormControlLabel
                aria-label='Acknowledge'
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                control={
                  <CustomRadio
                    value={element.id}
                    onChange={handleChange}
                    checked={selectedValue == element.id}
                  />
                }
                label={element.label}
              />
            </AccordionSummary>
            <AccordionDetails>
              <Typography color='textSecondary'>
                {element.description}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

AccordionList.propTypes = {
  options: PropTypes.array,
};

export default AccordionList;
