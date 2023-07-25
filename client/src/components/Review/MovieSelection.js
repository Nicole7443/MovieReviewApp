import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const MovieSelection = ({onMovieChange, onErrorMovieSelect, valueMovieSelect, movie}) => {
  return (
    <Box>
      <FormControl sx={{minWidth: 228}}>
        <InputLabel id="select-label">Movie</InputLabel>
        <Select
          labelID="select"
          id="select"
          value={valueMovieSelect}
          label="Movies"
          onChange={onMovieChange}
          error={onErrorMovieSelect}
          style={{ height: '50px' }}
          autoWidth={true}
        >
          {movie.map((movieItem) => {
            return (
              <MenuItem value={movieItem.id}>{movieItem.name}</MenuItem>
            )
          }
          )
          } 
        </Select>
      </FormControl>
    </Box>
  );
}

export default MovieSelection;