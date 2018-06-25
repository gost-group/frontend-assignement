import styled from 'styled-components';
import { Colors } from '../../../utils/index';

const LoaderBase = styled.div.attrs({
  className: 'loader-base',
  size: ({ size }) => `${size}px` || '15px',
  color: ({ color }) => color || '#FFFFFF'
})`
  width: ${({ size }) => size};
  border-radius: 50%;
  height: ${({ size }) => size};
  border: 0.25rem solid ${({ color }) => Colors.hexToRgba(color, 0.2)};
  border-top-color: ${({ color }) => color};
`;

export default LoaderBase;
