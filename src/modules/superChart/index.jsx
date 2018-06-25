import React from 'react';
import { max, reduce } from 'ramda';
import { compose, lifecycle, withHandlers, withStateHandlers } from 'recompose';

import { fetchPolygon } from '../../api';

import SvgWithLoader from './components/SvgWithLoader';
import SuperChartWrp from './components/styled/SuperChartWrp';

const SuperChart = ({ width, height, zoom, isLoaded, polygon, polygonStats }) => (
  <SuperChartWrp {...{ width, height, zoom }}>
    <h1>Super Chart</h1>
    <SvgWithLoader
      {...{
        isLoaded,
        size: 35,
        polygon,
        polygonStats
      }}
    />
  </SuperChartWrp>
);

const calcPolygonSquare = polygon =>
  polygon.reduce(
    (acc, value, index, arr) => (index !== 1 ? acc + (value + arr[index - 1]) / 2 : (value + arr[index - 1]) / 2)
  );
const polygonToSVGPoints = polygon => polygon.map(point => `${point[0]},${point[1]}`).reduce((a, b) => `${a} ${b}`);

const getPolygonMaxValues = polygon => {
  const line = polygon.map(elem => elem[1]);
  return {
    square: calcPolygonSquare(line),
    xMax: polygon.length,
    yMax: reduce(max, 0, line)
  };
};

const componentHandlres = {
  handleKeyDown: ({ changeZoom }) => () => e => (e.keyCode === 13 ? changeZoom() : null)
};

const componentLifecycle = {
  componentDidMount() {
    fetchPolygon().then(result => {
      this.props.setPolygon(result);
    });
    document.addEventListener('keydown', this.props.handleKeyDown());
  },

  componentWillUnmount() {
    document.removeEventListener('keydown', this.props.handleKeyDown());
  }
};

const enhance = compose(
  withStateHandlers(
    ({
      initialIsLoaded = false,
      initialPolygon = [],
      initialPolygonMaxValues = {
        xMax: 0,
        yMax: 0
      }
    }) => ({
      zoom: 1,
      isLoaded: initialIsLoaded,
      polygon: initialPolygon,
      polygonStats: initialPolygonMaxValues
    }),
    {
      setPolygon: () => polygon => ({
        isLoaded: true,
        polygon: polygonToSVGPoints(polygon),
        polygonStats: getPolygonMaxValues(polygon)
      }),
      changeZoom: ({ zoom }) => () => ({
        zoom: zoom === 1 ? zoom * 1.5 : 1
      })
    }
  ),
  withHandlers(componentHandlres),
  lifecycle(componentLifecycle)
);

export default enhance(SuperChart);
