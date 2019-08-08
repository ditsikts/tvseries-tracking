import React from 'react';

class CategoryTab extends React.Component {

    categorySelected = (cat, e) => {
        this.props.handler(cat);
    }

    render() {
        let style;
        if (this.props.cat.active){
            style = {
                backgroundColor: 'peru'
            };
        }
        else{
            style ={};
        }

        return (
            <li onClick={(e) => this.categorySelected(this.props.cat.title, e)} key={this.props.cat.title} style={style} className="btn list-group-item d-flex justify-content-between align-items-center">
                {this.props.cat.title}
                <span className="badge badge-primary badge-pill">{this.props.cat.count}</span>
            </li>
        );
    }
}

export default CategoryTab;