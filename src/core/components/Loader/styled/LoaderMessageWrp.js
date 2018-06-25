import styled from 'styled-components';
import { Colors } from '../../../utils/index';

const LoaderMessageWrp = styled.div.attrs({
  color: ({ color }) => color || '#FFFFFF'
})`
  padding-top: 5px;
  color: ${({ color }) => Colors.hexToRgba(color, 0.9)};
`;

export default LoaderMessageWrp;
