import React from 'react';
import LeftSide from './LeftSide';
import RightSide from './RightSide';

const HeroContent = () => {
  return (
    <div className="w-full h-[95dvh] flex flex-col-reverse md:grid md:grid-cols-2">
      
      {/* LeftSide */}
      <div className="flex items-center justify-center md:justify-start md:items-center pl-6 md:pl-16 lg:pl-20 py-8">
        <LeftSide />
      </div>

      {/* RightSide */}
      <div className="flex items-center justify-center h-[90%]">
        <RightSide />
      </div>

    </div>
  );
};

export default HeroContent;
