import React from 'react';
import './insert-tv-series.css';
import TvSeriesForm from '../TvSeriesForm/tv-series-form';
import { saveOrUpdateTvSeries } from '../../../Service/TvSeriesApi';
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
    };

  }

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
      <TvSeriesForm tvSeries={this.state.tvSeries} header={this.state.header} handler={this.getFormInput} />
    );
  }
}

export default InsertTvSeries;