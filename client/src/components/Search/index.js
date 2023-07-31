import React from 'react';
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router-dom';

//for App Bar:
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@emotion/react';
import {createTheme} from '@mui/material/styles';

import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";

const Search = () => {
  const navigate = useNavigate(); 
  const theme = createTheme({
    palette: {
      primary: {
        main: '#2962ff',
      },
    },
  });
  
  const [searchTitle, setSearchedTitle] = React.useState('');
  const [searchActor, setSearchedActor] = React.useState('');
  const [searchDirector, setSearchedDirector] = React.useState('');
  const [testSearch, setTestSearch] = React.useState('');

  const handleSearchedTitleChange = (event) => {
    setSearchedTitle(event.target.value);
  };

  const handleSearchedActorChange = (event) => {
    setSearchedActor(event.target.value);
  };

  const handleSearchedDirectorChange = (event) => {
    setSearchedDirector(event.target.value);
  };

  const handleSearchClick = (event) => {
    setTestSearch('Submitted');
  }

  return (
      <div>
        <ThemeProvider theme={theme}>
          <AppBar position = "static">
          <Toolbar>
            <Button 
              color='inherit'
              label = "Landing"
              onClick = {() => navigate('/')}
              value = "/"
            >
              Landing
            </Button>
  
            <Button 
              color='inherit'
              label = "Review"
              onClick = {() => navigate('/Review')}
              value = "/Review"
            >
              Review
            </Button>
  
            <Button 
              color='inherit'
              label = "MovieInfo"
              onClick = {() => navigate('/MovieInfo')}
              value = "/MovieInfo"
            >
              Movie Info
            </Button>
          </Toolbar>
        </AppBar>
        <Typography variant="h3" style={{ color: '#2962ff'}}>
          Search
        </Typography>
      <Grid container spacing={4} alignItems="center">
        <Grid item>
          <TextField 
            id="search-movie-title" 
            label="Movie Title" 
            variant="standard"
            value={searchTitle}
            onChange={handleSearchedTitleChange}
          />
        </Grid>
        <Grid item>
          <TextField 
              id="search-actor" 
              label="Actor Name" 
              variant="standard"
              value={searchActor}
              onChange={handleSearchedActorChange}
            />
        </Grid>
        <Grid item>
          <TextField 
              id="search-director" 
              label="Director Name" 
              variant="standard"
              value={searchDirector}
              onChange={handleSearchedDirectorChange}
            />
        </Grid>
        <Grid item>
          <Button  
            variant="contained"
            onClick={handleSearchClick}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Typography variant="h5" style={{ color: '#2962ff'}}>
          You searched for the following results & {testSearch}:
      </Typography>
      <Typography variant = "h6">
        {'Movie: ' + searchTitle + ', ' + 'Actor: ' + searchActor + ', ' + 'Director: ' + searchDirector}
      </Typography>
      </ThemeProvider>
    </div>
  )
}

export default Search;
