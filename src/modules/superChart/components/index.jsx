import React, { Component } from 'react';

import { Loader } from 'core/components/Loader';

class SuperChart extends Component {

  static numberToPixels(number) {
    return `${number}px`;
  }

  static polygonToSVGPoints(polygon) {
    return polygon
            .map(point => `${point[0]},${point[1]}`)
            .reduce((a, b) => `${a} ${b}`);
  }

  constructor() {
    super();
    this.state = {
      isLoaded: false,
      polygon: [],
      polygonMaxValues: {
        xMax: 0,
        yMax: 0,
      },
    };
  }

  render() {
    const { width, height } = this.props;
    const { isLoaded, polygon, polygonMaxValues } = this.state;
    return (
      <div
        className="super-chart"
        style={{
          width:  this.constructor.numberToPixels(width),
          height: this.constructor.numberToPixels(height),
        }}
      >
        <h1>Super Chart</h1>
        {isLoaded
          ? <svg
              width='100%'
              height='100%'
              viewBox={`0 0 ${polygonMaxValues.xMax} ${polygonMaxValues.yMax}`}
              preserveAspectRatio="none"
            >
              <polyline
                points={this.constructor.polygonToSVGPoints(polygon)}
                fill="#4E5A7D"
                stroke="#7E91C9"
                strokeWidth="0.5"
              />
            </svg>
          : <Loader.loading size={35} />
        }
        <div className="super-chart__analytics">
          {isLoaded && <div>max <span className="super-chart__analytics__value">{0}</span></div>}
          {isLoaded && <div>area <span className="super-chart__analytics__value">{0}</span></div>}
        </div>
      </div>
    );
  }
};

export default SuperChart;
