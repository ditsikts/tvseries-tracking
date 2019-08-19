import React from 'react';
import { Redirect } from 'react-router-dom';
import './insert-tv-series.css';
import TvSeriesForm from '../TvSeriesForm/tv-series-form';

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
    const url = 'http://localhost:8080/api/tvseries';
    if (newTvSeries !== null) {
      fetch(url, {
        method: 'POST', // or 'PUT'
        // mode: 'cors',
        body: JSON.stringify(newTvSeries), // data can be `string` or {object}!
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