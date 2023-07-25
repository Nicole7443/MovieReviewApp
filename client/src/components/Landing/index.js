import React from 'react';
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const Landing = () => {
    const appBar = () => {
        const navigate = useNavigate();
    
        return (
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
        )
      }
    return (
        <div>
            <appBar />
        </div>
    )
}

export default Landing;
