import React from 'react';

class CategoryTab extends React.Component {

    categorySelected = (cat, e) => {
        this.props.handler(cat);
    }

    render() {
        let style;
        if (this.props.cat.active) {
            style = {
                backgroundColor: '#0294A5'
            };
        }
        else {
            style = {
                backgroundColor : '#C1403D'
            };
        }



        return (
            <div className="col-md-2 p-1 " key={this.props.cat.category} onClick={(e) => this.categorySelected(this.props.cat.category, e)}>
                <div style={style} className="d-flex justify-content-between align-items-center p-2 rounded border border-success">
                    <p className="mb-0">{this.props.cat.category}</p>
                    <span className="badge badge-primary badge-pill">{this.props.cat.count}</span>
                </div>
            </div>
        );
    }
}

export default CategoryTab;