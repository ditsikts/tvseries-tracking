import React, { useEffect, useState } from 'react';
import './tv-series-form.css';
import { getCategories } from '../../../Service/TvSeriesApi';

const TvSeriesForm = (props) => {

    const [tvSeries, setTvSeries] = useState({
        id: '',
        title: '',
        status: '',
        categories: []
    });

    const [selectCategories, setSelectCategories] = useState([]);


    useEffect(() =>
        getCategories()
            .then(data => {
                setSelectCategories(  data );

            }), []);

    useEffect(() =>
        newTvSeries(props.tvSeries)
        , [ props.tvSeries ]);


    const newTvSeries = (tvSeries) => {

        setTvSeries({
            id: tvSeries.id,
            title: tvSeries.title,
            status: tvSeries.status,
            categories: tvSeries.categories
        });
    }
    const prepareFormInput = () => {
        let categories = [];
        let tvSeries = null;
        const categoriesSelected = this.state.categories;
        if (categoriesSelected.length < 1 || categoriesSelected.length > 3) {
            alert("Please Choose betweent 1 to 3 Categories!");
        }
        else {
            for (let c of this.state.categories) {
                //we create key(id) value(select input) Category object
                categories.push({ id: c });
            }
            tvSeries = {
                id: this.state.id,
                title: this.state.title,
                status: this.state.status,
                categories: categories
            };
        }
        this.props.handler(tvSeries);
    }

    const handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
    }

    const handleStatusChange = (event) => {
        this.setState({ status: event.target.value });
    }

    const handleCategoriesChange = (event) => {
        let options = event.target.options;
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setTvSeries({ categories: value });
    }

    const selectCategoriesPopulate = selectCategories.map(
        catObj => <option value={catObj.id} key={catObj.id}>{catObj.category}</option>);

    return (
        <div className="col-md-8 mt-5 mb-5 rounded p-3 formColor">

            <h2 className="mb-3">{props.header}</h2>
            <form onSubmit={prepareFormInput}>
                <div className="form-group row">
                    <label htmlFor="tv_series_title" className="col-sm-3 col-form-label">Title</label>
                    <div className="col-sm-9">
                        <input type="text" value={tvSeries.title} onChange={handleTitleChange} className="form-control" id="tv_series_title" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="tv_series_status" className="col-sm-3 col-form-label" >Status</label>
                    <div className="col-sm-9">
                        <select value={tvSeries.status} onChange={handleStatusChange} className="form-control" id="tv_series_status">
                            <option value="Ongoing">Ongoing</option>
                            <option value="Ended">Ended</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="tv_series_category1" className="col-sm-3 col-form-label">Categories</label>
                    <div className="col-sm-9">
                        <select value={tvSeries.categories} onChange={handleCategoriesChange} className="form-control" id="tv_series_category1" multiple >
                            {selectCategoriesPopulate}
                        </select>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary border btnColor">Save</button>
                </div>
            </form>
        </div>
    );

}
export default TvSeriesForm;