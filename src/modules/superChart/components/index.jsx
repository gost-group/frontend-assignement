import React, { Component } from 'react';

import { Loader } from 'core/components/Loader';
import { fetchPolygon } from '../../../api';

class SuperChart extends Component {

  state = {
    isLoaded: false,
    polygon: [],
    polygonMaxValues: {
      xMax: 0,
      yMax: 0,
    },
  }

  numberToPixels = number => `${number}px`;

  polygonToSVGPoints = polygon => {
    const {xMax,yMax} = this.state.polygonMaxValues;
    const points = polygon.map(point => `${point[0]},${yMax-point[1]*0.95}`)
                         .reduce((a, b) => `${a} ${b}`)
    //костыль, добавил по одной точке в начале и в конце, 
    //чтобы красиво отображалась площадь под графиком, не нашел пока способа лучше
    return `-100,${yMax} ${points} ${xMax+100},${yMax}`; 
  }

  getPolygonMaxValues = polygon => ({
      xMax: polygon.length,
      yMax: Math.max.apply(Math,polygon.map((elem) => elem[1]))
  });

  calcPolygonSquare = polygon => {
      let square = 0;
      const line = polygon.map((elem) => elem[1]);
      for (let i = 1; i < line.length ; i++)
        square += (line[i] + line[i-1]) / 2
      return Math.floor(square);
  }

  componentWillMount(){
    fetchPolygon().then(
      result => {
        this.setState({
          polygon: result,
          isLoaded: true,
          polygonMaxValues: this.getPolygonMaxValues(result)
        });
      }
    )
  }

  render() {

    const { 
      width, 
      height 
    } = this.props;

    const { 
      isLoaded, 
      polygon, 
      polygonMaxValues 
    } = this.state;

    const { 
      numberToPixels, 
      polygonToSVGPoints, 
      calcPolygonSquare 
    } = this;
    
    return (
      
      <div
        className="super-chart"
        style={{
          width:  numberToPixels(width),
          height: numberToPixels(height),
        }}
      >
        <h1>Super Chart</h1>
        {isLoaded
          ? <svg
              width = '100%'
              height = '100%'
              viewBox = {`0 0 ${polygonMaxValues.xMax-1} ${polygonMaxValues.yMax}`}
              preserveAspectRatio = "none"
            >
              <polyline
                points = {polygonToSVGPoints(polygon)}
                fill="#4E5A7D"
                stroke="#7E91C9"
                strokeWidth="0.5"
                fillRule="nonzero"
              />
            </svg>
          : <Loader.loading size={35} />
        }
        <div className="super-chart__analytics">
          {isLoaded && <div>max <span className="super-chart__analytics__value">{polygonMaxValues.yMax}</span></div>}
          {isLoaded && <div>area <span className="super-chart__analytics__value">{calcPolygonSquare(polygon)}</span></div>}
        </div>
      </div>
    );
  }
};

export default SuperChart;
