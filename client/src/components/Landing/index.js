import React from 'react';
import Typography from "@mui/material/Typography";

import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';

const Landing = () => {
    const navigate = useNavigate(); 

    function RecentMovies() {
      return (
      <div>
        <Typography variant="h4" align = 'center' style={{ color: '#2962ff'}}>
          Movies Out Now
        </Typography>
        <ImageList sx={{ width: 1250, height: 500 }} cols={5}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
           
              <ImageListItemBar
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
        link: 'https://www.youtube.com/watch?v=pBk4NYhWNMM',
        rows: 2,
        cols: 3,
        featured: true,
      },
      {
        img: 'https://assets-prd.ignimgs.com/2022/07/21/oppenheimer-poster-1658411601593.jpeg',
        title: 'Oppenheimer',
        genre: 'Drama/Thriller',
        link: 'https://www.youtube.com/watch?v=pBk4NYhWNMM'
      },
      {
        img: 'https://images.justwatch.com/poster/305409535/s592/mission-impossible-7',
        title: 'Mission Impossible 7',
        genre: 'Action/Adventure',
        link: 'https://www.youtube.com/watch?v=pBk4NYhWNMM'
      },
      {
        img: 'https://fullerstudio.fuller.edu/wp-content/uploads/2023/06/elemental-poster.jpg',
        title: 'Elemental',
        genre: 'Animation/Comedy',
        link: 'https://www.youtube.com/watch?v=pBk4NYhWNMM',
       
      },
      {
        img: 'https://m.media-amazon.com/images/M/MV5BMjdlZjI4YTEtNjgzZi00NTA1LWIwZWYtMDc0MzhjOWNlYjcxXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg',
        title: 'Insidious the Red Door',
        genre: 'Horror/Evil',
        link: 'https://www.youtube.com/watch?v=pBk4NYhWNMM',
        
      },
    ];

    return (
        <div>
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
    
              <Button 
                color='inherit'
                label = "MyPage"
                onClick = {() => navigate('/MyPage')}
                value = "/MyPage"
              >
                MyPage
              </Button>
            </Toolbar>
          </AppBar>
          <RecentMovies />
        </div>
    )
}

export default Landing;
