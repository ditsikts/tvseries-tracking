import React from 'react';

class InsertTvSeries extends React.Component {

  render() {

    return (
      <div className="row justify-content-center">
        <div className="col-md-6">
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
            <div className="form-group row justify-content-end">
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default InsertTvSeries;