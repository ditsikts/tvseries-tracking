import React, { Fragment } from 'react';
import TvSeriesCard from '../TvSeriesCard/tv-series-card';
import CategoryTab from '../CategoryTab/category-tab';
import CategoryDetail from '../../Models/CategoryDetail';
import './search.css';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            tvSeriesFullList: [],
            tvSeriesFilteredList: [],
            categories: [],
            loading: true
        };
    }

    componentDidMount() {
        // const url = 'http://localhost:8080/api/tvseries';
        const url = 'https://api.myjson.com/bins/qp5vv';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState(
                    {
                        tvSeriesFullList: data,
                        tvSeriesFilteredList: data,
                        loading: false
                    });
                this.initializeCategories(data);
            });
        console.log("search mount");
    }

    generateCategories = (tvSeriesList) => {
        let categoriesMap = new Map();
        //get categories distinct and how many times find each
        for (let m of tvSeriesList) {
            for (let c of m.categories) {
                if (categoriesMap.has(c.category)) {
                    categoriesMap.set(c.category, categoriesMap.get(c.category) + 1);
                }
                else {
                    categoriesMap.set(c.category, 1);
                }
            }
        }
        let categoriesArray = [];
        // Convert Map to Array and adding one extra property to track if selected
        for (let [key, value] of categoriesMap) {
            categoriesArray.push(new CategoryDetail(key, value, false));
        }
        return categoriesArray;
    }

    initializeCategories(tvSeriesFullList) {

        const categoriesArray = this.generateCategories(tvSeriesFullList);

        this.setState({ categories: categoriesArray });

    }

    searchInputChange = (event) => {
        this.setState({ searchInput: event.target.value });
        this.filterTvSeriesList(event.target.value, null);
    }

    clearInput = () => {
        this.setState({ searchInput: '' });
        this.filterTvSeriesList('', this.state.categories);

    }

    categorySelected = (category) => {
        let tempCatList = this.state.categories;
        // check which category is selected and toggle active boolean
        tempCatList = tempCatList.map(c => {
            if (c.category === category) {
                c.active = !c.active;
            }
            return c;
        });
        this.setState({ categories: tempCatList });
        this.filterTvSeriesList(null, tempCatList);
    }

    //check if input is empty after Delete or Backspace was pressed
    keyReleased = (event) => {
        if (event.keyCode === 46 || event.keyCode === 8) {
            if (this.state.searchInput === '') {
                this.filterTvSeriesList(null, null);
            }
        }
    }

    //filter list by title and by category passing current changes or gets values from state
    filterTvSeriesList = (searchChanged, categoriesChanged) => {
        let currentSearch;
        let currentCategories;

        //check if we have new input or get from state
        if (searchChanged || searchChanged === '') {
            currentSearch = searchChanged;
        }
        else {
            currentSearch = this.state.searchInput;
        }
        if (categoriesChanged) {
            currentCategories = categoriesChanged;
        }
        else {
            currentCategories = this.state.categories;
        }

        //get active categories(only property category) for easier filtering
        const categoriesActive = currentCategories.reduce(
            (acc, cat) => {
                if (cat.active) {
                    acc.push(cat.category);
                }
                return acc;
            }, []);

        let tempTvSeriesList = this.state.tvSeriesFullList;

        // if search input isnt empty use it to filter
        if (currentSearch !== "") {
            tempTvSeriesList = tempTvSeriesList
                .filter(tvs => tvs.title.toLowerCase().includes(currentSearch.toLowerCase()));
        }

        //we have to set state.categories before filter tvseries
        //by categories because will return only active categories
        //but we want all categories match with input search
        this.populateCategories(tempTvSeriesList);

        //if categories isnt empty use it to filter
        if (categoriesActive.length !== 0) {
            //we search tvs.categories array, if once match -> break to avoid doubles triples
            tempTvSeriesList = tempTvSeriesList.reduce(
                (acc, tvs) => {
                    for ( let c of tvs.categories){
                        if (categoriesActive.includes(c.category)){
                            acc.push(tvs);
                            break;
                        }
                    }
                    return acc;
                }
            , []);
        }
        this.setState({ tvSeriesFilteredList: tempTvSeriesList });

    }

    populateCategories = (tempTvSeriesList) => {
        const currentCategories = this.state.categories;

        let categoriesArray = this.generateCategories(tempTvSeriesList);

        // we copy active property from state.categories which has previous state
        // for not losing which category is clicked
        categoriesArray = categoriesArray.map(
            (cat) => {
                let index = currentCategories.map(c => c.category).indexOf(cat.category);
                if (index !== -1) {
                    cat.active = currentCategories[index].active;
                }
                return cat;
            }
        );
        this.setState({ categories: categoriesArray });
    }

    render() {

        if (this.state.loading) {
            return <p>Loading</p>
        }

        const tvSeriesCards = this.state.tvSeriesFilteredList.map((m) => <TvSeriesCard movie={m} key={m.id} />);
        const categoriesEl = this.state.categories.map((c) => <CategoryTab key={c.category} handler={this.categorySelected} cat={c} />);

        return (
            <Fragment>
                <main className="container">
                    <div className="searchContainer row d-flex justify-content-center pt-3">
                        <div className="input-group mb-3 col-md-6">
                            <input onChange={this.searchInputChange} onKeyUp={this.keyReleased} type="text"
                                className="form-control" value={this.state.searchInput} placeholder="search"
                                aria-label="search" aria-describedby="search for tv series" />
                            <div className="input-group-append">
                                <button onClick={this.clearInput} className="btn btn-outline-secondary" type="button"><i className="far fa-times-circle"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="row categoryTabsContainer">
                        {categoriesEl}
                    </div>
                    <div className="row tvCardsContainer">
                        {tvSeriesCards}
                    </div>
                </main>
            </Fragment>
        );
    }
}

export default Search;