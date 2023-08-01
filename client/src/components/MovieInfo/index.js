import * as React from 'react';
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Grid from "@mui/material/Grid";
import Divider from '@mui/material/Divider';
import { ThemeProvider } from '@emotion/react';
import {createTheme} from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
      
const serverURL = "";

const MovieInfo = () => {
  const navigate = useNavigate(); 
  const theme = createTheme({
    palette: {
      primary: {
        main: '#2962ff',
      },
    },
  });

  const [movieTrailers, setMovieTrailers] = React.useState([]);
  const [selectedTrailer, setSelectedTrailer] = React.useState('');
  const [movieName, setSelectedMovieName] = React.useState('');
  const [trailerLink, setTrailerLink] = React.useState('');
  const [topMovies, setTopMovies] = React.useState([]);
  const [watchClicked, setWatchClicked] = React.useState(false);
  const [summary, setSummary] = React.useState('');

  const handleSelectMovieTrailerChange = (event) => {
    setSelectedTrailer(event.target.value);
    setSelectedMovieName(movieTrailers.find(movie => movie.id == event.target.value).name);
  };

  const handleWatchClick = (event) => {
    setTrailerLink(movieTrailers.find(movie => movie.id == selectedTrailer).trailer);
    setSummary(movieTrailers.find(movie => movie.id == selectedTrailer).summary);
    setWatchClicked(true);
  };

  const getTrailers = () => {
    callApiGetTrailers()
      .then(res => {
        var parsed = JSON.parse(res.express);
        setMovieTrailers(parsed);
      })
  }

  const getTopMovies = () => {
    callApiGetTopMovies()
      .then(res => {
        var parsed = JSON.parse(res.express);
        setTopMovies(parsed);
      })
  }

  React.useEffect(() => {
    getTrailers();
    getTopMovies();
    setWatchClicked(false);
  }, []);

  const callApiGetTrailers = async () => {
    const url = serverURL + "/api/getTrailers";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  const callApiGetTopMovies = async () => {
    const url = serverURL + "/api/getTopMovies";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
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
              label = "Search"
              onClick = {() => navigate('/Search')}
              value = "/Search"
            >
              Search
            </Button>
  
            <Button 
              color='inherit'
              label = "Review"
              onClick = {() => navigate('/Review')}
              value = "/Review"
            >
              Review
            </Button>
          </Toolbar>
        </AppBar>
        <Divider>
          <Typography variant="h3" style={{ color: '#2962ff'}} align='center' marginTop='12px'>
            Movie Info
          </Typography>
          <Typography variant="h6" style={{ color: '#949494'}} sx={{ fontStyle: 'italic' }} align='center'>
            Check out the highest rated movies, trailers, and movie summaries
          </Typography>
        </Divider>
        <Stack direction="row" spacing={2}>
          <Grid container spacing={2} alignItems="left" direction="column" margin='12px'>
            <Grid item>
              <Stack spacing={2} direction="row">
                <Box>
                  <FormControl sx={{minWidth: 228}}>
                    <InputLabel id="select-label">Movie Trailer</InputLabel>
                    <Select
                      labelID="movie-trailer"
                      id="movie-trailer-select"
                      value={selectedTrailer}
                      label="Movie Trailer"
                      onChange={handleSelectMovieTrailerChange}
                      style={{ height: '50px' }}
                      autoWidth={true}
                    >
                      {movieTrailers.map((movieItem) => {
                        return (
                          <MenuItem value={movieItem.id}>{movieItem.name}</MenuItem>
                        )
                      }
                      )
                      } 
                    </Select>
                  </FormControl>
                </Box>
                <Button variant="contained" onClick={handleWatchClick}> Watch</Button>
              </Stack>
            </Grid>
            <Grid item marginTop='12px'>
              <Box sx={{width: 'fit-content'}}>
                <Typography variant="h5" style={{ color: '#2962ff'}}>
                  Top 5 Rated Movies:
                </Typography>
                <ol>
                  {topMovies.map((movie) => (
                    <li key={movie.id}>
                      <Stack spacing={2} direction="row" margin='12px'>
                        <strong>{movie.MovieName}</strong>
                        <Box sx={{backgroundColor: '#cccccc', width: '10%', height: '10%', borderRadius: '10px'}}>
                          <Typography style={{ color: '#2962ff'}} align='center'><strong>{movie.AvgScore}</strong></Typography>
                        </Box>
                      </Stack>
                    </li>
                  ))}
                </ol>
              </Box>
            </Grid>
          </Grid>
            <Grid container spacing={0} alignItems="left" direction="column" margin='12px'>
              <Grid item>
                <Typography variant="h5" style={{ color: '#2962ff'}} marginTop='12px'>
                  Movie Trailer: <i style={{ color: 'grey'}}>{movieName}</i>
                </Typography>
              </Grid>
            {(watchClicked) &&
              <div>
                <Grid item>
                  <iframe
                    width="560"
                    height="315"
                    src={trailerLink}
                    title="Trailer"
                    allowFullScreen>
                  </iframe>
                </Grid>
                <Grid item>
                  <Divider style={{ backgroundColor: '#2962ff', height: 2, width:560, marginTop: '10px'}}></Divider>
                  <Typography variant="h5" style={{ color: '#2962ff'}}>
                    Movie Summary
                  </Typography>
                  <Typography variant="body1" >
                    {summary}
                  </Typography>
                </Grid>
              </div>
            }
            </Grid>
        </Stack>
      </ThemeProvider>
    </div>
  )
}

export default MovieInfo;
