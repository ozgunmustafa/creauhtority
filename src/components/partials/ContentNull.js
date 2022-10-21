import React from 'react';
import Image from './Image';

const ContentNull = ({ text }) => {
  return (
    <div className="flex flex-col items-center  gap-8 lg:flex-row lg:justify-start py-5">
      <Image
        alt="exercitation in veniam ex ad. Commodo in ipsum sunt reprehenderi"
        url="/content-null.svg"
      />
      <span className="font-bold text-[1.2rem] lg:text-[2rem] text-black">
        {text}
      </span>
    </div>
  );
};

export default ContentNull;
