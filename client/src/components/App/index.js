import * as React from 'react';
import {createTheme} from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../Landing';
import Search from '../Search';
import MyPage from '../MyPage';
import Review from '../Review';

const App = () => {

  return (
      <div>
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
