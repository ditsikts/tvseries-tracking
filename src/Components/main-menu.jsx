import React from 'react';
import Search from './search';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import InsertTvSeries from './insert-tv-series';
import tvSeries from '../Models/dump-data';

class MainMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      tvSeriesFullList: tvSeries
    };
  }
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

        <Route path="/" exact render={(props) => <Search {...props} tvSeriesList={tvSeries} />} />
        <Route path="/insert/" component={InsertTvSeries} />
      </Router>
    );
  }
}

export default MainMenu;