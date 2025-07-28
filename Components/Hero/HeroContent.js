import React from 'react'
import LeftSide from './LeftSide'
import RightSide from './RightSide'


const HeroContent = () => {
  return (
    <div className=' flex flex-col-reverse md:flex-row  w-[100%] h-[92.56%] md:h-[92%] lg:h-[89%]'>

      <div className='w-full md:w-1/2 h-full flex flex-col items-start justify-center pl-20 '>
        <LeftSide/>
      </div>

      <div className='w-full md:w-1/2 h-full  flex items-center justify-center'>
        <RightSide/>
      </div>

    </div>
  )
}

export default HeroContent