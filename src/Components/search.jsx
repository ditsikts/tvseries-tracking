import React, { Fragment } from 'react';
import tvSeries from '../Models/dump-data';
import TvSeriesCard from './tv-series-card';
import CategoryTab from './category-tab';
import CategoryDetail from '../Models/CategoryDetail';


class Search extends React.Component {

    constructor() {
        super();
        this.state = {
            searchInput: '',
            tvSeriesFullList: tvSeries,
            tvSeriesFilteredList: tvSeries,
            categories: []
        };

    }

    componentWillMount() {
        this.populateCategories(this.state.tvSeriesFullList);
    }

    populateCategories(newPropsMovieList) {

        let categoriesMap = new Map();
        //get categories distinct and how many times find each
        for (let m of newPropsMovieList) {
            if (categoriesMap.has(m.category)) {
                categoriesMap.set(m.category, categoriesMap.get(m.category) + 1);
            }
            else {
                categoriesMap.set(m.category, 1);
            }
        }
        let categoriesArray = [];
        for (let [key, value] of categoriesMap) {
            categoriesArray.push(new CategoryDetail(key, value, false));
        }

        this.setState({ categories: categoriesArray });
    }

    searchInputChange = (event) => {
        this.setState({ searchInput: event.target.value });
        this.filterTvSeriesList(event.target.value,null);
    }

    clearInput = () => {
        this.setState({ searchInput: '' });
    }

    categorySelected = (category) => {
        let tempCatList = this.state.categories;
        tempCatList = tempCatList.map(c => {
            if (c.category === category) {
                if (c.active) {
                    c.active = false;
                }
                else {
                    c.active = true;
                }
            }
            return c;
        });
        this.setState({ categories: tempCatList });
        this.filterTvSeriesList(null , tempCatList);
    }

    filterTvSeriesList = (searchChanged, categoriesChanged) => {
        let search;
        let currentCategories;
        if(searchChanged){
            search = searchChanged;
        }
        else {
            search = this.state.searchInput;
        }
        if(categoriesChanged){
            currentCategories = categoriesChanged;
        }
        else {
            currentCategories = this.state.categories;
        }

        let categoriesActive = currentCategories
            .filter(cat => cat.active)
            .map(cat => cat.category);
        console.log(categoriesActive);

        let tempTvSeriesList = this.state.tvSeriesFullList
            .filter(tvs => tvs.title.toLowerCase().includes(search.toLowerCase()))
            .filter(tvs => categoriesActive.includes(tvs.category));

console.log(tempTvSeriesList);



        this.setState({ tvSeriesFilteredList: tempTvSeriesList });
    }

    render() {

        const tvSeriesCards = this.state.tvSeriesFilteredList.map((m) => <TvSeriesCard movie={m} key={m.id} />);
        const categoriesEl = this.state.categories.map((c) => <CategoryTab key={c.category} handler={this.categorySelected} cat={c} />);

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