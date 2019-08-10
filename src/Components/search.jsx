import React, { Fragment } from 'react';
import TvSeriesCard from './tv-series-card';
import CategoryTab from './category-tab';
import CategoryDetail from '../Models/CategoryDetail';

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
        let url = 'https://api.myjson.com/bins/13r2gt';
        fetch(url)
        .then(response => response.json())
        .then(data => {
            this.setState(
                {
                    tvSeriesFullList : data, 
                    tvSeriesFilteredList : data,
                    loading : false
                });
            this.initializeCategories( data); 
        });
        console.log("search mount");
        
        
    }

    initializeCategories(tvSeriesFullList) {
        
        let categoriesMap = new Map();
        //get categories distinct and how many times find each
        for (let m of tvSeriesFullList) {
            if (categoriesMap.has(m.category)) {
                categoriesMap.set(m.category, categoriesMap.get(m.category) + 1);
            }
            else {
                categoriesMap.set(m.category, 1);
            }
        }
        let categoriesArray = [];
        // Convert Map to Array and adding one extra property to track if selected
        for (let [key, value] of categoriesMap) {
            categoriesArray.push(new CategoryDetail(key, value, false));
        }

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
        let search;
        let currentCategories;
        if (searchChanged || searchChanged === '') {
            search = searchChanged;
        }
        else {
            search = this.state.searchInput;
        }
        if (categoriesChanged) {
            currentCategories = categoriesChanged;
        }
        else {
            currentCategories = this.state.categories;
        }

        //get list of active categories
        let categoriesActive = currentCategories
            .filter(cat => cat.active)
            .map(cat => cat.category);

        let tempTvSeriesList = this.state.tvSeriesFullList;

        // if search input isnt empty use it to filter
        if (search !== "") {
            tempTvSeriesList = tempTvSeriesList
                .filter(tvs => tvs.title.toLowerCase().includes(search.toLowerCase()));
        }
        
        this.populateCategories(tempTvSeriesList);

        //if categories isnt empty use it to filter
        if (categoriesActive.length !== 0) {
            tempTvSeriesList = tempTvSeriesList.filter(tvs => categoriesActive.includes(tvs.category));
        }
        this.setState({ tvSeriesFilteredList: tempTvSeriesList });
        
    }

    populateCategories = (tempTvSeriesList) => {
        let currentCategories = this.state.categories;

        

        let categoriesMap = new Map();
        //get categories distinct and how many times find each
        for (let m of tempTvSeriesList) {
            if (categoriesMap.has(m.category)) {
                categoriesMap.set(m.category, categoriesMap.get(m.category) + 1);
            }
            else {
                categoriesMap.set(m.category, 1);
            }
        }
        let categoriesArray = [];
        // Convert Map to Array and adding one extra property to track if selected
        for (let [key, value] of categoriesMap) {
            categoriesArray.push(new CategoryDetail(key, value, false));
        }

        categoriesArray = categoriesArray.map(
            (cat) => {
                let index = currentCategories.map(c => c.category).indexOf(cat.category);
                // let index = currentCategories.category.indexOf(cat.category);
                if(index !== -1){                    
                    cat.active = currentCategories[index].active;
                }
                return cat;

            }
        );
        this.setState({categories : categoriesArray});
    }

    render() {
        let objStyle = {
            backgroundColor : '#04060F'
          }
          let cards = {
            backgroundColor : '#A79C93'
          }
          
          let cat = {
            // backgroundColor : '#C1403D'
            
            backgroundColor : '#A79C93'
          }
        if(this.state.loading){
            return <p>Loading</p>
        }

        const tvSeriesCards = this.state.tvSeriesFilteredList.map((m) => <TvSeriesCard movie={m} key={m.id} />);
        const categoriesEl = this.state.categories.map((c) => <CategoryTab key={c.category} handler={this.categorySelected} cat={c} />);

        return (
            <Fragment>
                <div className="container">
                <div style={objStyle} className="row d-flex justify-content-center pt-3">
                    <div className="input-group mb-3 col-md-6">
                        <input onChange={this.searchInputChange} onKeyUp={this.keyReleased} type="text" className="form-control" value={this.state.searchInput} placeholder="search" aria-label="search" aria-describedby="search for tv series" />
                        <div className="input-group-append">
                            <button onClick={this.clearInput} className="btn btn-outline-secondary" type="button"><i className="far fa-times-circle"></i></button>
                        </div>
                    </div>
                </div>
                <div style={cat} className="row">
                    {categoriesEl}
                </div>
                <div style={cards} className="row">
                    {tvSeriesCards}
                </div></div>
            </Fragment>
        );
    }
}

export default Search;