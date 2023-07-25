import * as React from 'react';
import {createTheme} from '@mui/material/styles';
import Review from './Review';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../Landing';
import Search from '../Search';
import MyPage from '../MyPage';
import { ThemeProvider } from '@emotion/react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#2962ff',
      },
    },
  });

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
        <Router>
          <div>
            <Routes>
              <Route path="/MyPage" element={<MyPage />} />
              <Route path="/Search" element={<Search />} />
              <Route path="/Review" element={<Review />} />
              <Route path="/" element={<Landing />} />
            </Routes>
          </div>
        </Router>
       
      </div>
      
  );
}

export default App;
