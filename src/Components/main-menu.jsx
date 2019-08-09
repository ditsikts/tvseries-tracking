import React from 'react';
import Search from './search';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import InsertTvSeries from './insert-tv-series';

class MainMenu extends React.Component {
  render() {
    return (
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/insert/">Insert </Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Search} />
        <Route path="/insert/" component={InsertTvSeries} />
      </Router>
    );
  }
}

export default MainMenu;