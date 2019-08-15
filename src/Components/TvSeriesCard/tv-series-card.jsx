import React from 'react';
import './tv-series-card.css';

class TvSeriesCard extends React.Component {

  render() {

    return (
      <div className="position-relative col-md-3 p-1 ">
        <div className="d-flex justify-content-center bg-info tvSeriesCard">
          <p className="text-center position-absolute headerPosition">{this.props.movie.title}</p>
        </div>
      </div>
    );
  }
}

export default TvSeriesCard;