import React from 'react';
import InsertTvSeries from '../InsertTvSeries/insert-tv-series';
import './edit-tv-series.css';

class EditTvSeries extends React.Component {

  constructor() {
    super();
    this.state = {
      searchInput: '',
      tvSeriesList: [],
      selectedTvSeries: {}
    };

  }

  keyReleased = (event) => {
    if (event.keyCode === 13) {
      const search = this.state.searchInput;
      if (search.length < 2) {
        alert("Please give at least 2 characters");
      }
      else {
        this.searchDb(search);
      }
    }
  }

  searchDb = (search) => {
    const url = 'http://localhost:8080/api/tvseries/' + search;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState(
          {
            tvSeriesList: data,
          });
      });
  }

  searchInputChange = (event) => {
    this.setState({ searchInput: event.target.value });
  }
  render() {
    const tvSeriesFound = this.state.tvSeriesList.map(tvS => <li key={tvS.id}>{tvS.id} {tvS.title}</li>);

    return (
      <div className="col">
        <div className="searchContainer row d-flex justify-content-center pt-3">
          <div className="input-group mb-3 col-md-6">
            <input onKeyUp={this.keyReleased} type="text" onChange={this.searchInputChange}
              className="form-control" value={this.state.searchInput} placeholder="type and press enter"
              aria-label="search" aria-describedby="search for tv series" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <InsertTvSeries tvSeries={null} />
          </div>
          <div className="col-md-4">
            <ul>
              {tvSeriesFound}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default EditTvSeries;