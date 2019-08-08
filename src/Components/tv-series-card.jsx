import React from 'react';

class TvSeriesCard extends React.Component {

  render() {
    const styles = {
      height : '250px',

    }
    const headerStyles = {
      bottom:'20px',
      position: 'absolute'
    }

    return (
      <div className="position-relative col-md-3 p-1">
        <div style={styles} className="d-flex justify-content-center bg-info">
          <h4 style={headerStyles}>{this.props.movie.title}</h4>
        </div>
      </div>
    );
  }
}

export default TvSeriesCard;