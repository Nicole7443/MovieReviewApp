import * as React from 'react';
import TextField from '@mui/material/TextField';

const ReviewTitle = ({onTitleChange, onErrorReviewTitle, valueTitle}) => {
  return (
    <TextField 
      id="add-review-title" 
      label="Review Title" 
      variant="standard"
      value={valueTitle} 
      error={onErrorReviewTitle} 
      onChange={onTitleChange}
    />
  );
}

export default ReviewTitle;