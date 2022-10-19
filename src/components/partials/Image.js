import React from 'react'

const Image = ({url,alt,classNames}) => {
  return (
    <img
      src={`${process.env.PUBLIC_URL}/img${url}`}
      className={`${classNames}`}
      alt={alt}
    />
  );
}

export default Image