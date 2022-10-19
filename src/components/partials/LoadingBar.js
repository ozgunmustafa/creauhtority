import React from 'react';

const LoadingBar = ({ type,color }) => {
  return (
    <div
      className={`${type === 'fullsize' ? 'loading-bar' : ''} ${color} `}
    >
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingBar;
