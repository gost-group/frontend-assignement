import React from 'react';
import { compose, defaultProps } from 'recompose';

import LoaderWrp from './styled/LoaderWrp';
import LoaderBase from './styled/LoaderBase';

import LoaderMessage from './LoaderMessage';

const Loading = ({ size, color, message }) => (
  <LoaderWrp>
    <LoaderBase {...{ size, color }} />
    <LoaderMessage {...{ color, message }} />
  </LoaderWrp>
);

const defProps = {
  size: '15px',
  color: '#FFFFFF',
  message: null
};

const enhance = compose(defaultProps(defProps));

export const Loader = enhance(Loading);
