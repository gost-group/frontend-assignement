import React from 'react';
import { branch, compose, renderComponent, withProps } from 'recompose';

import { Loader } from '../../../core/components/Loader';

import SvgWithLoaderWrp from './styled/SvgWithLoaderWrp';

const SvgWithLoader = ({ polygonStats: { square, xMax, yMax }, points }) => (
  <SvgWithLoaderWrp>
    <svg width="100%" height="100%" viewBox={`0 0 ${xMax} ${yMax}`} preserveAspectRatio="none">
      <polyline points={points} fill="#4E5A7D" stroke="#7E91C9" strokeWidth="0.5" />
    </svg>
    <div className="super-chart__analytics">
      <div>
        max <span className="super-chart__analytics__value">{yMax}</span>
      </div>
      <div>
        area <span className="super-chart__analytics__value">{square}</span>
      </div>
    </div>
  </SvgWithLoaderWrp>
);
const checkIsLoaded = ({ isLoaded }) => !isLoaded;

const initProps = ({ polygon, polygonStats: { xMax, yMax } }) => ({
  points: `-${xMax},${yMax} ${polygon} ${xMax},${yMax}`
});

const enhance = compose(
  withProps(initProps),
  branch(checkIsLoaded, renderComponent(Loader))
);

export default enhance(SvgWithLoader);
