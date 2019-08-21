import React from 'react';
import './edit-tv-series.css';
import { findTvSeriesByTitle, getCategories, saveOrUpdateTvSeries, deleteTvSeries } from '../../../Service/TvSeriesApi';
import TvSeriesForm from '../TvSeriesForm/tv-series-form';

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
      header: 'Edit TV Series'
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

  editTvSeriesClicked = (event) => {
    let cid = Number(event.currentTarget.parentElement.id);

    let tvSeries = this.state.tvSeriesList.find(tvS => tvS.id === cid);
    tvSeries.categories = tvSeries.categories.map(c => c.id);
    this.setState(
      {
        tvSeries: tvSeries
      });

  }

  deleteTvSeriesClicked = (event) => {
    let cid = Number(event.currentTarget.parentElement.id);
    deleteTvSeries(cid)
      .then(data => {
        console.log('Success:', data)
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
          console.log('Success:', JSON.stringify(data))
        })
        .catch(error => console.error('Error:', error));
    }
  }

  getFormInput = (updatedTvSeries) => {
    this.submitForm(updatedTvSeries);

  }
  render() {

    const tvSeriesFound = this.state.tvSeriesList.map(tvS =>
      <div className="tvSeriesTab col-md-3 mt-1 p-1 rounded" key={tvS.id} >
        <div className="btnColor p-2 ">
          <p className="mb-0">{tvS.title}</p>
          <div  id={tvS.id} className="d-flex justify-content-between rounded border-0 ">
            <p onClick={this.editTvSeriesClicked} className="btn btn-warning ">edit</p>
            <p onClick={this.deleteTvSeriesClicked} className="btn btn-danger">delete</p>
          </div>
        </div>
      </div>);

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
        <div className="row">
          <TvSeriesForm tvSeries={this.state.tvSeries} header={this.state.header} handler={this.getFormInput} />


        </div>
      </div>
    );
  }
}

export default EditTvSeries;