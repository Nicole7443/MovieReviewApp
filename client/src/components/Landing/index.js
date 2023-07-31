import React from 'react';
import Typography from "@mui/material/Typography";

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { ThemeProvider } from '@mui/material/styles';
import {createTheme} from '@mui/material/styles';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PlaceIcon from '@mui/icons-material/Place';



const Landing = () => {
    const navigate = useNavigate(); 
    const theme = createTheme({
      palette: {
        primary: {
          main: '#2962ff',
        },
      },
    });
    function RecentMovies() {
      return (
        <div>
          <Divider>
            <Typography variant="h3" align = 'center' style={{ color: '#2962ff'}} marginTop='12px'>
              Movies Out Now
            </Typography>
          </Divider>
          <ImageList sx={{ width: '100%', maxWidth: 1250, height: 500}} cols={5}>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                />
                <ImageListItemBar align= 'center'
                  title={item.title}
                  subtitle={item.genre}
                />
                </ImageListItem>
            ))}
          </ImageList>
        </div>
      );
    }
    
    const itemData = [
      {
        img: 'https://deadline.com/wp-content/uploads/2023/04/barbie-BARBIE_VERT_TSR_W_TALENT_2764x4096_DOM_rgb.jpg?w=800',
        title: 'The Barbie Movie',
        genre: 'Comedy/Drama',
        rows: 2,
        cols: 3,
        featured: true,
      },
      {
        img: 'https://assets-prd.ignimgs.com/2022/07/21/oppenheimer-poster-1658411601593.jpeg',
        title: 'Oppenheimer',
        genre: 'Drama/Thriller'
      },
      {
        img: 'https://images.justwatch.com/poster/305409535/s592/mission-impossible-7',
        title: 'Mission Impossible 7',
        genre: 'Action/Adventure',
      },
      {
        img: 'https://fullerstudio.fuller.edu/wp-content/uploads/2023/06/elemental-poster.jpg',
        title: 'Elemental',
        genre: 'Animation/Comedy',
      },
      {
        img: 'https://m.media-amazon.com/images/M/MV5BMjdlZjI4YTEtNjgzZi00NTA1LWIwZWYtMDc0MzhjOWNlYjcxXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg',
        title: 'Insidious the Red Door',
        genre: 'Horror/Evil',
      },
    ];

    return (
        <div>
          <ThemeProvider theme={theme}>
            <AppBar position = "static">
            <Toolbar>
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
          <div style={{ display: 'flex', justifyContent: 'center'}}>
            <RecentMovies />
          </div>
          <Divider style={{ backgroundColor: '#2962ff', height: 4, marginTop: '100px'}}></Divider>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px'}}>
            <Stack direction="row" spacing={10} divider={<Divider orientation="vertical" flexItem />}>
              <Link to="https://www.cineplex.com/" target="_blank">
                <Button sx={{ border: '2px solid #2962ff', borderRadius: '15px'}} startIcon={<LocalActivityIcon />}>Buy Tickets</Button>
              </Link>
              <Link to="https://www.rottentomatoes.com/" target="_blank">
                <Button sx={{ border: '2px solid #2962ff', borderRadius: '15px'}} startIcon={<RateReviewIcon />}>Post Review</Button>
              </Link>
              <Link to="https://www.google.com/maps/search/movies+theaters+near+me/@43.4845132,-80.5589863,13z?entry=ttu" target="_blank">
                <Button sx={{ border: '2px solid #2962ff', borderRadius: '15px'}} startIcon={<PlaceIcon />}>Find Theatre</Button>
              </Link>
            </Stack>
          </div>
        </ThemeProvider>
      </div>
    )
}

export default Landing;
