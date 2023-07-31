import * as React from 'react';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import MovieSelection from './MovieSelection';
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@emotion/react';
import {createTheme} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';

const serverURL = "";

const Review = () => {
  const navigate = useNavigate(); 
  const theme = createTheme({
    palette: {
      primary: {
        main: '#2962ff',
      },
    },
  });

  //states declarations
  const [movies, setMovies] = React.useState([]);
  const [userID, setUserID] = React.useState('1');
  const [movieName, setSelectedMovieName] = React.useState('');
  
  const [selectedMovie, setSelectedMovie] = React.useState('');
  const [errorSelectedMovie, setErrorSelectedMovie] = React.useState(false);

  const [enteredTitle, setEnteredTitle] = React.useState('');
  const [errorEnteredTitle, setErrorEnteredTitle] = React.useState(false);

  const [enteredReview, setEnteredReview] = React.useState('');
  const [errorEnteredReview, setErrorEnteredReview] = React.useState(false);

  const [selectedRating, setSelectedRating] = React.useState('');
  const [errorSelectedRating, setErrorRating] = React.useState(false);

  const [successfulSubmission, setSubmissionStatus] = React.useState(false);

  const [finalReview, setFinalReview] = React.useState([]);

  //constants and functions declarations

  const updateFinalReview = () => {
    setFinalReview([selectedMovie, enteredTitle, enteredReview, selectedRating, movieName]);
  };

  const handleSelectMovieChange = (event) => {
    setSelectedMovie(event.target.value);
    setErrorSelectedMovie(false);
    setSelectedMovieName(movies.find(movie => movie.id == event.target.value).name);
  };

  const handleEnteredTitleChange = (event) => {
    setEnteredTitle(event.target.value);
    setErrorEnteredTitle(false);
  };

  const handleEnteredReviewChange = (event) => {
    setEnteredReview(event.target.value);
    setErrorEnteredReview(false);
  };

  const handleSelectRatingChange = (event) => {
    setSelectedRating(event.target.value);
    setErrorRating(false);
  };

  const handleSubmitClick = (event) => {
    event.preventDefault();
    if(!selectedMovie) {
      setErrorSelectedMovie(true);
    }
    if (!enteredTitle) {
      setErrorEnteredTitle(true);
    }
    if (!enteredReview) {
      setErrorEnteredReview(true);
    }
    if (!selectedRating) {
      setErrorRating(true);
    }
    if(selectedMovie && enteredTitle && enteredReview && selectedRating) {
      setSubmissionStatus(true);
      setUserID('1');
      updateFinalReview();
      callAddReview();

      setEnteredTitle('');
      setEnteredReview('');
      setSelectedMovie('');
      setSelectedRating('');
      setSelectedMovieName('');

      setErrorEnteredTitle(false);
      setErrorEnteredReview(false);
      setErrorSelectedMovie(false);
      setErrorRating(false);
    } else {
      setSubmissionStatus(false);
    }
  }

  const getMovies = () => {
    callApiGetMovies()
      .then(res => {
        var parsed = JSON.parse(res.express);
        setMovies(parsed);
      })
  }

  React.useEffect(() => {
    getMovies();
  }, []);

  const callApiGetMovies = async () => {
    const url = serverURL + "/api/getMovies";
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
  
  const callAddReview = async () => {
    const url = serverURL + "/api/addReview";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: userID,
        moviesID: selectedMovie,
        reviewTitle: enteredTitle,
        reviewContent: enteredReview,
        reviewScore: selectedRating
      })
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
        label = "MovieInfo"
        onClick = {() => navigate('/MovieInfo')}
        value = "/MovieInfo"
      >
        Movie Info
      </Button>
    </Toolbar>
  </AppBar>
    <Divider>
      <Typography variant="h3" style={{ color: '#2962ff'}} align='center' margin='12px'>
          Review a Movie
      </Typography>
    </Divider>
    <Grid container spacing={2} alignItems="center" marginLeft='12px'>
      <Grid item>
        <Typography variant="body1" component="body1">
          Select a movie from the dropdown list here.
        </Typography>
      </Grid>
      <Grid item>
        {/*Rendering MovieSelection*/}
        <MovieSelection 
          onMovieChange = {handleSelectMovieChange}
          onErrorMovieSelect = {errorSelectedMovie}
          valueMovieSelect = {selectedMovie}
          movie = {movies}
        /> 
        {errorSelectedMovie && 
          <Typography variant="body1" component="body1" color="red">
            Select your movie
          </Typography>
        }
        {successfulSubmission && 
          <Typography variant="body1" component="body1" color="green">
            Your review has been received
          </Typography>
        }
      </Grid>
      <Grid item>
        <Typography variant="body1" component="body1">
          Enter a review title into the textbox here.
        </Typography>
      </Grid>
      <Grid item>
        {/*Rendering ReviewTitle*/}
        <ReviewTitle
          onTitleChange = {handleEnteredTitleChange}
          onErrorReviewTitle = {errorEnteredTitle}
          valueTitle = {enteredTitle}
        />
        {errorEnteredTitle && 
          <div>
            <Typography variant="body1" component="body1" color="red">
              Enter your review title
            </Typography>
          </div>
        }
        {successfulSubmission && 
          <div>
            <Typography variant="body1" component="body1" color="green">
              Your review has been received
            </Typography>
          </div>
        }
      </Grid>
      <Grid item>
        <Typography variant="body1" component="body1">
          Add your movie review below.
        </Typography>
        {/*Rendering ReviewBody*/}
        <ReviewBody
          onBodyChange = {handleEnteredReviewChange}
          onBodyError = {errorEnteredReview}
          valueBody = {enteredReview}
        />
        {errorEnteredReview &&
          <div>
            <Typography variant="body1" component="body1" color="red">
              Enter your review
            </Typography>
          </div>
        }
        {successfulSubmission && 
          <Typography variant="body1" component="body1" color="green">
            Your review has been received
          </Typography>
        }
      </Grid>
    </Grid>
    <Grid container spacing={2} alignItems="center" marginLeft='12px'>
      <Grid item>
        <Typography variant="body1" component="body1" style ={{textAlign: 'right'}}>
          Rate the movie on a scale from 1 to 5.
        </Typography>
      </Grid>
      <Grid item>
        {/*Rendering ReviewRating*/}
        <ReviewRating
          onRatingChange = {handleSelectRatingChange}
          onRatingError = {errorSelectedRating}
          valueRating = {selectedRating}
        />
        {errorSelectedRating && 
          <div>
            <Typography variant="body1" component="body1" color="red">
              Select the rating
            </Typography>
          </div>
        }
        {successfulSubmission && 
          <div>
            <Typography variant="body1" component="body1" color="green">
              Your review has been received
            </Typography>
          </div>
        }
      </Grid>
    </Grid>
    <Grid container direction="column" marginLeft='27px'>
      <Grid
        item
        spacing={2}
        direction="row"
        alignItems="left"
      >
        <Typography variant="body1" component="body1">
            Submit your movie review by clicking the 'Submit' button below.
        </Typography>
      </Grid>
      <Grid
        item
        spacing={2}
        direction="row"
        alignItems="left"
      >
        <Stack spacing={2} direction="row" marginTop='12px'>
          <Button variant="contained" onClick={handleSubmitClick}>Submit</Button>
        </Stack>
      </Grid>
    </Grid>
    <Divider>
      <Typography variant="h6" style={{ color: '#2962ff'}}>
        Submission Results
      </Typography>
    </Divider>
    {successfulSubmission &&
      <Grid container direction="column" spacing={2} margin='12px'>
        <Grid item>
          <Stack direction="row" spacing={1}>
            <Typography variant="body1" sx={{ fontWeight: 'bold'}}>Movie Title:</Typography>
            <Typography variant="body1">{finalReview[4]}</Typography>
          </Stack>
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={1}>
            <Typography variant="body1" sx={{ fontWeight: 'bold'}}>Review Title:</Typography>
            <Typography variant="body1">{finalReview[1]}</Typography>
          </Stack>
        </Grid>
        <Grid item>
          <Stack direction="column" spacing={1}>
            <Typography variant="body1" sx={{ fontWeight: 'bold'}}>Movie Review:</Typography>
            <Box sx={{ maxWidth: 500, height: 100, border: '1px solid black'}}>
              <Typography variant="body1" sx={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{finalReview[2]}</Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={1}>
            <Typography variant="body1" sx={{ fontWeight: 'bold'}}>Movie Rating:</Typography>
            <Typography variant="body1">{finalReview[3]}</Typography>
          </Stack>
        </Grid>
      </Grid>
    }
    </ThemeProvider>
    </div>
  );
}

export default Review;