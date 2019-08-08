import React, { Fragment } from 'react';
import tvSeries from '../Models/dump-data';
import TvSeriesCard from './tv-series-card';
import CategoryTab from './category-tab';


class Search extends React.Component {

    constructor() {
        super();
        this.state = {
            searchInput : '',
            tvSeriesFullList: tvSeries,
            tvSeriesFilteredList: [],
            categories : []
        };
    }

    searchInputChange = (event) => {
        this.setState({searchInput: event.target.value});
      }

    clearInput = () => {
        this.setState({searchInput: ''});
    }

    render() {

        const tvSeriesCards = this.state.tvSeriesFullList.map((m) => <TvSeriesCard movie={m} key={m.id} />);
        const categoriesEl = this.state.categories.map((c) => <CategoryTab key={c.title} handler={this.categorySelected} cat={c} />);

        return (
            <Fragment>
                <div className="row d-flex justify-content-center">
                    <div className="input-group mb-3 col-md-6">
                        <input onChange={this.searchInputChange} type="text" className="form-control" value={this.state.searchInput} placeholder="search" aria-label="search" aria-describedby="search for tv series" />
                        <div className="input-group-append">
                            <button onClick={this.clearInput} className="btn btn-outline-secondary" type="button"><i className="far fa-times-circle"></i></button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {categoriesEl}
                </div>
                <div className="row">
                    {tvSeriesCards}
                </div>
            </Fragment>
        );
    }
}

export default Search;