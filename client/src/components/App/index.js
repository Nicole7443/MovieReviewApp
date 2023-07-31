import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../Landing';
import Search from '../Search';
import MovieInfo from '../MovieInfo';
import Review from '../Review';

const App = () => {

  return (
      <div>
        <Router>
          <div>
            <Routes>
              <Route path="/MovieInfo" element={<MovieInfo />} />
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
