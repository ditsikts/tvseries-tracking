import React from 'react';
import './insert-tv-series.css';
import TvSeriesForm from '../TvSeriesForm/tv-series-form';
import { saveOrUpdateTvSeries } from '../../../Service/TvSeriesApi';

class InsertTvSeries extends React.Component {

  submitForm = (newTvSeries) => {
    if (newTvSeries !== null) {
      saveOrUpdateTvSeries(newTvSeries)
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

    return (
      <TvSeriesForm
        tvSeries={
          {
            id: '',
            title: '',
            status: '',
            categories: [],
          }
        }
        header='Insert TV Series'
        handler={this.getFormInput} />
    );
  }
}

export default InsertTvSeries;