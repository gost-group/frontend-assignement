import React from 'react';

import { Colors } from 'core/utils';

const style = {
  loader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: "100%",
  },
};

export const Loader = {
  loading: (props) => {
    const { size = '15px', color = '#FFFFFF', message = null } = props;
    return (
      <div style={style.loader}>
        <div
          className='loader-base'
          style={{
            width: size,
            height: size,
            border: `.25rem solid ${Colors.hexToRgba(color, 0.2)}`,
            borderTopColor: color,
            borderRadius: '50%',
          }}
        />
        <div
          style={{ color: `${Colors.hexToRgba(color, 0.9)}`, paddingTop: '5px' }}
        >
          {message}
        </div>
      </div>
    );
  }
};
