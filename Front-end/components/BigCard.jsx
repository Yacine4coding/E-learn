import React from 'react'
import Image from 'next/image'

import bigCardImg from '@/public/bigcard.jpg'

const BigCard = () => {
  return (
    <div className='relative w-[50%] h-[700px] bg-blue-800 rounded-[36px] overflow-hidden'>

        <div className="absolute w-full h-full">
            <Image
                src={bigCardImg}
                alt='Big Card'
                width='100%'
                height='100%'
                className='-z-10 inset-0'
            />
            <div className='absolute w-full -z-9 inset-0 h-full bg-gradient-to-t  from-black via-transparent via-50%  to-transparent'></div>
        </div>

        <div className='relative flex flex-col items-start justify-end h-full p-7  w-full'>
            <h2 className='text-gray-400 font-gilroy font-regular text-2xl leading-10'>Yacine Bensidahemd</h2>
            <h1 className="text-white text-3xl font-gilroy font-medium mb-5">Masterclass in Design Thinking, Innovation & Creativity</h1>
        </div>

    </div>
  )
}

export default BigCard