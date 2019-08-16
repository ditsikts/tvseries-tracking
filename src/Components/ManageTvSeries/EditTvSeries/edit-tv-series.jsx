import React from 'react';
import InsertTvSeries from '../InsertTvSeries/insert-tv-series';
import './edit-tv-series.css';

class EditTvSeries extends React.Component {

  constructor() {
    super();
    this.state = {
      searchInput : '',
      header: '',
      tvSeriesList : [],
      selectedTvSeries : {}
    };

  }

  keyReleased = (event) => {
    if (event.keyCode === 46 || event.keyCode === 8) {
      if (this.state.searchInput === '') {
        this.filterTvSeriesList(null, null);
      }
    }
  }
  searchInputChange = (event) => {
    this.setState({ searchInput: event.target.value });
    this.filterTvSeriesList(event.target.value, null);
}
  render() {

    return (
      <div className="col">
        <div className="searchContainer row d-flex justify-content-center pt-3">
          <div className="input-group mb-3 col-md-6">
            <input onKeyUp={this.keyReleased} type="text" onChange={this.searchInputChange}
              className="form-control" value={this.state.searchInput} placeholder="search"
              aria-label="search" aria-describedby="search for tv series" />
            <div className="input-group-append">
              <button onClick={this.clearInput} className="btn btn-outline-secondary" type="button"><i className="far fa-times-circle"></i></button>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <InsertTvSeries tvSeries={null} />
        </div>
      </div>
    );
  }
}

export default EditTvSeries;