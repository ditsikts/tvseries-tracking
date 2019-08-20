import React from 'react';
import { Redirect } from 'react-router-dom';
import './insert-tv-series.css';
import TvSeriesForm from '../TvSeriesForm/tv-series-form';
import { saveTvSeries } from '../../../Service/TvSeriesApi';
class InsertTvSeries extends React.Component {

  constructor() {
    super();

    this.state = {
      tvSeries : {
        id : '',
        title: '',
        status: '',
        categories: [],
      },
      selectCategories: [],
      header : 'Insert TV Series',
      redirect: false
    };

  }

  submitForm = (newTvSeries) => {
    if (newTvSeries !== null) {
      saveTvSeries(newTvSeries)
        .then(data => {
          console.log('Success:', JSON.stringify(data))
          this.setState({ redirect: true });
        })
        .catch(error => console.error('Error:', error));
    }
  }

  getFormInput = (newTvSeries) => {
    this.submitForm(newTvSeries);
    
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to='/manage/' />
    }

    return (
      <TvSeriesForm tvSeries={this.state.tvSeries} header={this.state.header} handler={this.getFormInput} />

    );
  }
}

export default InsertTvSeries;