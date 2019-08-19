import React from 'react';
import './edit-tv-series.css';
import {getCategories} from '../../../Service/TvSeriesApi';

class EditTvSeries extends React.Component {

  constructor() {
    super();
    this.state = {
      id : '',
      title: '',
      status: '',
      categories: [],
      searchInput: '',
      tvSeriesList: [],
      selectCategories: []
    };
  }

  componentDidMount() {
    getCategories()
      .then(data => {
        this.setState({ selectCategories: data });
      });
  }
  prepareFormInput = () => {
    let categories = [];
    const categoriesSelected = this.state.categories;
    if (categoriesSelected.length < 1 || categoriesSelected.length > 3) {
      alert("Please Choose betweent 1 to 3 Categories!");
      return null;
    }
    for (let c of this.state.categories) {
      //we create key(id) value(select input) Category object
      categories.push({ id: c });
    }
    let tvSeries = {
      id: this.state.id,
      title: this.state.title,
      status: this.state.status,
      categories: categories
    };
    return tvSeries;
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

  tvSeriesClicked = (event) => {
    let cid = Number(event.currentTarget.id);

    let tvSeries = this.state.tvSeriesList.find(tvS => tvS.id === cid);
    this.setState(
      { 
        title: tvSeries.title,
        status:tvSeries.status,
        id: tvSeries.id,
        categories: tvSeries.categories.map(c => c.id)
      });

  }
  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  }

  handleStatusChange = (event) => {
    this.setState({ status: event.target.value });
  }
  searchInputChange = (event) => {
    this.setState({ searchInput: event.target.value });
  }
  handleCategoriesChange = (event) => {
    let options = event.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({ categories: value });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const tvSeries = this.prepareFormInput();
    const url = 'http://localhost:8080/api/tvseries';
    if (tvSeries !== null) {
      fetch(url, {
        method: 'PUT', // or 'PUT'
        // mode: 'cors',
        body: JSON.stringify(tvSeries), // data can be `string` or {object}!
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(response => {
          console.log('Success:', JSON.stringify(response))
          this.setState({ redirect: true });
        })
        .catch(error => console.error('Error:', error));
    }
  }
  render() {
    const selectCategories = this.state.selectCategories.map(
      catObj => <option value={catObj.id} key={catObj.id}>{catObj.category}</option>);

    const tvSeriesFound = this.state.tvSeriesList.map(tvS => <li onClick={this.tvSeriesClicked} key={tvS.id} id={tvS.id} >{tvS.title}</li>);

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
          <div className="col-md-8 mt-5 mb-5 rounded p-3 formColor">
            <h2 className="mb-3">Edit Tv Series</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row">
                <label htmlFor="tv_series_title" className="col-sm-3 col-form-label">Title</label>
                <div className="col-sm-9">
                  <input type="text" value={this.state.title} onChange={this.handleTitleChange} className="form-control" id="tv_series_title" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="tv_series_status" className="col-sm-3 col-form-label" >Status</label>
                <div className="col-sm-9">
                  <select value={this.state.status} onChange={this.handleStatusChange} className="form-control" id="tv_series_status">
                    <option value="Ongoing">Ongoing</option>
                    <option value="Ended">Ended</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="tv_series_category1" className="col-sm-3 col-form-label">Categories</label>
                <div className="col-sm-9">
                  <select value={this.state.categories} onChange={this.handleCategoriesChange} className="form-control" id="tv_series_category1" multiple >
                    {selectCategories}
                  </select>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary border btnColor">Save</button>
              </div>
            </form>
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