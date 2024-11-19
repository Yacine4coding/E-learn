import React from 'react'
import Image from 'next/image'
import decoration from '@/public/prom/Rhône.svg'

const Announse = () => {


    const handleJoinClick = () => {
        console.log('Joining EduLink...')
    }

  return (
    <div className="bg-[#1B283F] relative flex flex-col w-[90%]  h-[300px] mx-auto rounded-xl overflow-hidden">
        
        <div className="font-gilroy flex justify-start flex-col items-start h-full w-full p-20">
            <h1 className="text-white text-4xl font-medium mb-2">Join Edulink now to get 35% off</h1>
            <h2 className='text-gray-400 font-thin text-2xl leading-10'>join our responsive themes and mobile and desktop apps,<br /> enjoy a seamless experience on any device so will your blog the best visitor</h2>
            <button className=' my-4 font-gilroy text-base py-2 px-6 font-bold border-2 border-green-500 bg-green-500 text-white hover:bg-transparent hover:border-white rounded-md hoverTransition '>Join EduLink</button>
        </div>

        <Image 
            src={decoration}
            alt="Promotional Rhone"
            width={100}
            className='absolute bottom-0 right-0 h-full w-[400px]'
        />
    
    </div>
  )
}

export default Announse