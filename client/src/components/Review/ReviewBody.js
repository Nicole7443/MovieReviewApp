import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const ReviewBody = ({onBodyChange, onBodyError, valueBody}) => {

  return (
    <Box sx={{'& .MuiTextField-root': { m: 1, width: '64ch'},}}>
      <div>
        <TextField
          id="movie-review-textbox"
          label="Movie Review"
          multiline
          inputProps={{maxlength: 200}}
          value={valueBody}
          onChange={onBodyChange}
          error={onBodyError}
        />
      </div>
    </Box>
  );
}

export default ReviewBody;