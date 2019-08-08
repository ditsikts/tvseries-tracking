import React from 'react';

class TvSeriesCard extends React.Component {

  render() {
    const styles = {
      height : '250px',

    }
    const headerStyles = {
      bottom:'20px'
    }

    return (
      <div className="position-relative col-md-3 p-1 ">
        <div style={styles} className="d-flex justify-content-center bg-info">
          <p style={headerStyles} className="text-center position-absolute">{this.props.movie.title}</p>
        </div>
      </div>
    );
  }
}

export default TvSeriesCard;