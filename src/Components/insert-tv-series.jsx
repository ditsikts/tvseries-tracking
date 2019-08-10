import React from 'react';

class InsertTvSeries extends React.Component {

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
    return (
      <div className="container">
        <div style={style} className="row justify-content-center">
          <div style={styleform} className="col-md-6 mt-5 mb-5 rounded p-3">
            <h2 className="mb-3">Insert new series</h2>
            <form>
              <div className="form-group row">
                <label htmlFor="tv_series_title" className="col-sm-2 col-form-label">Title</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="tv_series_title" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="tv_series_category" className="col-sm-2 col-form-label">Category</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="tv_series_category" />
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