import React from 'react';
import Search from '../Search/search';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ManageTvSeries from '../ManageTvSeries/manage-tv-series';
import './main-menu.css';

class MainMenu extends React.Component {
  render() {

    //#04060F #03353E #0294A5 #A79C93 #C1403D
    return (
      <div className="container">
        <Router>
          <nav className="navbar navbar-expand-lg navbar-dark">
            <Link className="navbar-brand" to="/">Home</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/manage/">Manage </Link>
                </li>
              </ul>
            </div>
          </nav>
          <Route path="/" exact component={Search} />
          <Route path="/manage/" component={ManageTvSeries} />
        </Router>
      </div>
    );
  }
}

export default MainMenu;