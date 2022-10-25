import React from 'react';
import Image from './Image';

const ContentNull = ({ text }) => {
  return (
    <div className="flex flex-col items-center  gap-8 lg:flex-row lg:justify-start py-5">
      <Image
        alt="exercitation in veniam ex ad. Commodo in ipsum sunt reprehenderi"
        url="/content-null.svg"
        classNames="w-20 lg:w-40 flex-none"
      />
      <span className="lg:w-2/3 flex-auto font-bold text-[1.2rem] lg:text-[2rem] text-black">
        {text}
      </span>
    </div>
  );
};

export default ContentNull;
