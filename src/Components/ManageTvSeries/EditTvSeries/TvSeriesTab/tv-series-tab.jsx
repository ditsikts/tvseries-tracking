import React from 'react';
import './tv-series-tab.css';

const tvSeriesTab = (props) => {

    const deleteTvSeriesClicked = (title, event) => {
        let cid = Number(event.currentTarget.parentElement.id);
        if (window.confirm("Do you really want to delete " + title)) {
            props.handler('delete', cid);
        }
    }

    const editTvSeriesClicked = (event) => {
        let cid = Number(event.currentTarget.parentElement.id);
        props.handler('edit', cid);
    }

    return (
        <div className=" col-md-3 mt-1 p-1 rounded"  >
            <div className="btnColor p-2 ">
                <p className="mb-0">{props.title}</p>
                <div id={props.id} className="d-flex justify-content-between rounded border-0 ">
                    <p onClick={editTvSeriesClicked} className="btn btn-warning mb-0">edit</p>
                    <p onClick={(e) => deleteTvSeriesClicked(props.title, e)} className="btn btn-danger mb-0">delete</p>
                </div>
            </div>
        </div>
    )

}
export default tvSeriesTab;