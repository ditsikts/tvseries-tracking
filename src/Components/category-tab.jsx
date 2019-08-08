import React from 'react';

class CategoryTab extends React.Component {

    categorySelected = (cat, e) => {
        this.props.handler(cat);
    }

    render() {
        let style;
        if (this.props.cat.active) {
            style = {
                backgroundColor: 'peru'
            };
        }
        else {
            style = {};
        }

        return (
            <div className="col-md-2 p-1 " key={this.props.cat.category} onClick={(e) => this.categorySelected(this.props.cat.category, e)}>
                <div style={style} className="d-flex justify-content-between align-items-center p-1 rounded border border-success">
                    <p>{this.props.cat.category}</p>
                    <p className="badge badge-primary badge-pill">{this.props.cat.count}</p>
                </div>
            </div>
        );
    }
}

export default CategoryTab;