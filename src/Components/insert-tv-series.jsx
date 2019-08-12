import React from 'react';
import { Redirect } from 'react-router-dom';

class InsertTvSeries extends React.Component {

  constructor() {
    super();
    this.state = {
      title: '',
      status: '',
      categories: [],
      redirect: false
    };

  }

  handleSubmit = (event) => {
    event.preventDefault();

    const url = 'http://localhost:8080/api/tvseries';
    fetch(url, {
      method: 'POST', // or 'PUT'
      // mode: 'cors',
      body: JSON.stringify(
        {
          title: this.state.title,
          status: this.state.status,
          categories: this.state.categories,
        }), // data can be `string` or {object}!
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(response => {
        console.log('Success:', JSON.stringify(response))
        this.setState({ redirect: true });
      })
      .catch(error => console.error('Error:', error));
  }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  }

  handleStatusChange = (event) => {
    this.setState({ status: event.target.value });
  }

  handleCategoriesChange = (event) => {
    let options = event.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    console.log(value);
    
    this.setState({ categories: value });
  }

  render() {

    let style = {
      backgroundColor: '#A79C93'
    };
    let styleform = {
      backgroundColor: '#C1403D'
    };
    let stylebtn = {
      background: '#0294A5'
    }

    if (this.state.redirect) {
      return <Redirect to='/' />
    }

    return (
      <div className="container">
        <div style={style} className="row justify-content-center">
          <div style={styleform} className="col-md-6 mt-5 mb-5 rounded p-3">
            <h2 className="mb-3">Insert new series</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row">
                <label htmlFor="tv_series_title" className="col-sm-2 col-form-label">Title</label>
                <div className="col-sm-10">
                  <input type="text" value={this.state.title} onChange={this.handleTitleChange} className="form-control" id="tv_series_title" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="tv_series_status" className="col-sm-2 col-form-label" >Status</label>
                <div className="col-sm-10">
                  <select value={this.state.status} onChange={this.handleStatusChange} className="form-control" id="tv_series_status">
                    <option value="Ongoing">Ongoing</option>
                    <option value="Ended">Ended</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="tv_series_category1" className="col-sm-2 col-form-label">Categories</label>
                <div className="col-sm-10">
                  <select value={this.state.categories} onChange={this.handleCategoriesChange} className="form-control" id="tv_series_category1" multiple >
                    <option value="5">Drama</option>
                    <option value="1">Crime</option>
                    <option value="4">Horror</option>
                  </select>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button style={stylebtn} type="submit" className="btn btn-primary border">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default InsertTvSeries;