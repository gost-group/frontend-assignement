import styled from 'styled-components';
import PropTypes from 'prop-types';

const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

const SuperChartWrp = styled.div.attrs({
  className: 'super-chart',
  width: ({ width, zoom }) => width * zoom,
  height: ({ height, zoom }) => height * zoom
})`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

SuperChartWrp.propTypes = propTypes;

export default SuperChartWrp;
