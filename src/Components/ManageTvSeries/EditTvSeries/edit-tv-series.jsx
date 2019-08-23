import React from 'react';
import './edit-tv-series.css';
import { Redirect } from 'react-router-dom'
import { findTvSeriesByTitle, getCategories, saveOrUpdateTvSeries, deleteTvSeries } from '../../../Service/TvSeriesApi';
import TvSeriesForm from '../TvSeriesForm/tv-series-form';
import TvSeriesTab from './TvSeriesTab/tv-series-tab';

class EditTvSeries extends React.Component {

  constructor() {
    super();
    this.state = {
      tvSeries: {
        id: '',
        title: '',
        status: '',
        categories: [],
      },
      searchInput: '',
      tvSeriesList: [],
      header: 'Edit TV Series',
      redirect : false
    };
  }

  componentDidMount() {
    getCategories()
      .then(data => {
        this.setState({ selectCategories: data });
      });
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
    findTvSeriesByTitle(search)
      .then(data => {
        this.setState(
          {
            tvSeriesList: data,
          });
      });
  }

  editTvSeriesClicked = (id) => {
    let tvSeries = this.state.tvSeriesList.find(tvS => tvS.id === id);
    tvSeries.categories = tvSeries.categories.map(c => c.id);
    this.setState(
      {
        tvSeries: tvSeries
      });
  }

  deleteTvSeriesClicked = (id) => {
    deleteTvSeries(id)
      .then(data => {
        console.log('Success:', data);
        this.setState({redirect : true});
      })
      .catch(error => console.error('Error:', error));
  }

  searchInputChange = (event) => {
    this.setState({ searchInput: event.target.value });
  }

  submitForm = (tvSeries) => {
    if (tvSeries !== null) {
      saveOrUpdateTvSeries(tvSeries)
        .then(data => {
          console.log('Success:', JSON.stringify(data));
          this.setState({redirect : true});
        })
        .catch(error => console.error('Error:', error));
    }
  }

  getFormInput = (updatedTvSeries) => {
    this.submitForm(updatedTvSeries);
  }

  tabHandler = (action, id) => {
    if (action === 'delete') {
      this.deleteTvSeriesClicked(id);
    }
    else if (action === 'edit') {
      this.editTvSeriesClicked(id);
    }
    else {
      console.log("Unknown action!");
    }
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to='/manage/' />
    }
    const tvSeriesFound = this.state.tvSeriesList.map(tvS =>
      <TvSeriesTab id={tvS.id} title={tvS.title} handler={this.tabHandler} key={tvS.id} />
    );

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
          {tvSeriesFound}
        </div>
        <div className="row d-flex justify-content-center">
          <TvSeriesForm tvSeries={this.state.tvSeries} header={this.state.header} handler={this.getFormInput} />
        </div>
      </div>
    );
  }
}

export default EditTvSeries;
