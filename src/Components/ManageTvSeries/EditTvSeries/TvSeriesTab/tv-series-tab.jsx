import React from 'react';
import './tv-series-tab.css';

class TvSeriesTab extends React.Component {

    deleteTvSeriesClicked = (event) => {
        let cid = Number(event.currentTarget.parentElement.id);
        this.props.handler('delete', cid);
      }

      editTvSeriesClicked = (event) => {
        let cid = Number(event.currentTarget.parentElement.id);
        this.props.handler('edit', cid);
      }

    render() {
        return (
            <div className="tvSeriesTab col-md-3 mt-1 p-1 rounded"  >
                <div className="btnColor p-2 ">
                    <p className="mb-0">{this.props.title}</p>
                    <div id={this.props.id} className="d-flex justify-content-between rounded border-0 ">
                        <p onClick={this.editTvSeriesClicked} className="btn btn-warning ">edit</p>
                        <p onClick={this.deleteTvSeriesClicked} className="btn btn-danger">delete</p>
                    </div>
                </div>
            </div>
        )
    }
}
export default TvSeriesTab;