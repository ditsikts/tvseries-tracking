import React from 'react';
import './category-tab.css';

class CategoryTab extends React.Component {

    categorySelected = (cat, e) => {
        this.props.handler(cat);
    }

    render() {

        return (
            <div className="col-md-2 p-1 " key={this.props.cat.category} onClick={(e) => this.categorySelected(this.props.cat.category, e)}>
                <div className={"d-flex justify-content-between align-items-center p-2 rounded border-0 " + (this.props.cat.active ? 'categorySelected' : 'categoryNotSelected')}>
                    <p className="mb-0">{this.props.cat.category}</p>
                    <span className="badge badge-primary badge-pill">{this.props.cat.count}</span>
                </div>
            </div>
        );
    }
}

export default CategoryTab;