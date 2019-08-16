import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './manage-tv-series.css';
import InsertTvSeries from './InsertTvSeries/insert-tv-series';
import EditTvSeries from './EditTvSeries/edit-tv-series';

class ManageTvSeries extends React.Component {


  render() {
    const style = {
      height: '5px'
    }
    const styleHor = {
      width: '5px',
      // height: '30px'
    }
    return (
      <div className="container">
        <Router>
          <div className="row containerColor ">
            <aside className="col-md-3 sidebar pt-3 pb-3">

              <div className="row d-flex justify-content-center">
                <h3 className="asideHeaderColor">TV Series</h3>
              </div>
              <div className="row d-flex justify-content-center">
                <div style={style} className="containerColor w-75"></div>
              </div>
              <div className="row d-flex justify-content-center">
                <Link className="btn containerColor mt-2 mr-2" to="/manage/insert/">Insert</Link>
                <div style={styleHor} className="containerColor "></div>
                <Link className="btn containerColor mt-2 ml-2" to="/manage/edit/">Edit</Link>
              </div>

              <div className="row d-flex justify-content-center">
                <h3 className="pt-3 asideHeaderColor">Categories</h3>
              </div>
              <div className="row d-flex justify-content-center">
                <div style={style} className="containerColor w-75"></div>
              </div>
              <div className="row d-flex justify-content-center">
                <a className="btn containerColor mt-2 mr-2" href="">Insert</a> <div style={styleHor} className="containerColor "></div><a className="btn containerColor mt-2 ml-2" href="">Edit</a>
              </div>

            </aside>
            <div className="col-md-9 justify-content-center">
              <div className="row justify-content-center">
                <Route path="/manage/" exact render={() => <div className="col-md-9 d-flex justify-content-center align-items-center"><h1>Admin Panel</h1></div>} />
                <Route path="/manage/insert/" component={InsertTvSeries} />
                <Route path="/manage/edit/" component={EditTvSeries} />
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default ManageTvSeries;