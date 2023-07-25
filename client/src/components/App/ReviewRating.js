import * as React from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';

const ReviewRating = ({onRatingChange, onRatingError, valueRating}) => {

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="select-movie-rating-radio-buttonGroup"
        name="movie-rating-radio-buttons-group"
        value={valueRating}
        error={onRatingError}
        onChange={onRatingChange}
      >
        <FormControlLabel value="1" control={<Radio />} style={{color: '#2962ff'}} label="1" />
        <FormControlLabel value="2" control={<Radio />} style={{color: '#2962ff'}} label="2" />
        <FormControlLabel value="3" control={<Radio />} style={{color: '#2962ff'}} label="3" />
        <FormControlLabel value="4" control={<Radio />} style={{color: '#2962ff'}} label="4" />
        <FormControlLabel value="5" control={<Radio />} style={{color: '#2962ff'}} label="5" />
      </RadioGroup>
    </FormControl>
  );
}

export default ReviewRating;