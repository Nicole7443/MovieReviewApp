import React from 'react';
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router-dom';

//for App Bar:
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
      
const MyPage = () => {
  const navigate = useNavigate(); 
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
        <Typography>
            this is My page
        </Typography>
      </div>
  )
}

export default MyPage;
