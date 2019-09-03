import React from 'react';
import './category-tab.css';

const categoryTab = (props) => {


        return (
            <div className="col-md-2 p-1 " key={props.cat.category} onClick={(e) => props.handler(props.cat.category, e)}>
                <div className={"d-flex justify-content-between align-items-center p-2 rounded border-0 " + (props.cat.active ? 'categorySelected' : 'categoryNotSelected')}>
                    <p className="mb-0">{props.cat.category}</p>
                    <p className="badge badge-primary badge-pill">{props.cat.count}</p>
                </div>
            </div>
        );
}

export default categoryTab;