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
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

const serverURL = "";

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

  const [searchResults, setSearchResults] = React.useState([]);

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
    if (searchTitle || searchActor || searchDirector) {
      getMovies();
    }
  }

  const getMovies = () => {
    callGetSearchResults()
      .then(res => {
        var parsed = JSON.parse(res.express);
        setSearchResults(parsed);
      })
  }

  const callGetSearchResults = async () => {
    const url = serverURL + "/api/getSearchResults";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieName: searchTitle,
        actorName: searchActor,
        directorName: searchDirector,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
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
      <Typography marginTop='12px' variant="h4" style={{ color: '#2962ff'}}>
        Results...
      </Typography>
      <Grid container  alignItems="left">
        <Grid item>
          {searchResults.map((result, index) => (
            <div key = {result.movieName}>
              <Box margin='12px'>
                {result.review ? (
                  <div>
                    <Typography variant="h6" style={{ color: '#2962ff'}}>
                      Movie: {result.movieName}
                    </Typography>
                    <Typography>
                      <i style={{ color: 'dark grey'}}>Directed By {result.directorName}</i>
                    </Typography>
                    <Typography><strong>Avg Rating: {result.avgScore}</strong></Typography>
                    <Typography variant="h7"> <i style={{ color: 'dark grey'}}>Reviews:</i></Typography>
                    <ul>
                      {result.review.split(',').map((reviewItem, index) => (
                        <li key={index}>
                          <Typography variant="body1">{reviewItem}</Typography>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
                  :
                ( 
                  <div>
                    <Typography variant="h6" style={{ color: '#2962ff'}}>
                      Movie: {result.movieName}
                    </Typography>
                    <Typography>
                      <i>Directed By {result.directorName}</i>
                    </Typography>
                  </div>
                )
              }
            </Box>
            <Divider></Divider>
          </div>
        ))}
      </Grid>
    </Grid>
    </ThemeProvider>
  </div>
  )
}

export default Search;
