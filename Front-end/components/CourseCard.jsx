import React from 'react'
import Image from 'next/image'

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Rating from '@mui/material/Rating';
import { Badge } from "@/components/ui/badge"


// Helper function to truncate the description of a course
function truncateDescription(description, MAX_DESCRIPTION_LENGTH) {
  return description.length > MAX_DESCRIPTION_LENGTH
    ? description.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
    : description;
}

// Helper function to format a number with commas for readability
function formatNumber(number) {
    return number >= 1000 ? `${(number / 1000).toFixed(1)}k` : number.toString();
}


const CourseCard = ( { title, creator, imageUrl, description, price, stars, view, oldPrice } ) => {

  const formattedPrice = price.toFixed(2);
  const formattedOldPrice = oldPrice.toFixed(2);
  const discount = ((oldPrice - price) / oldPrice * 100).toFixed(0);


  return (
    <div className="max-w-sm font-gilroy bg-white overflow-hidden w-[285px] ">


      <div className="relative rounded-[23] w-full overflow-hidden">
        <div className='absolute flex flex-row'>
          <Badge className={"text-white text-[8px] font-gilroy font-extrabold rounded-2xl m-2 bg-green-500 p-[2px]"}>Best Seller</Badge>
          <Badge className={"text-white text-[8px] font-gilroy font-extrabold rounded-2xl my-2 bg-purple-700 p-[2px]"}>{discount}% OFF</Badge>
        </div>
        <Image 
          src={imageUrl}
          alt={title}
          width={0}
          height={0} 
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-base font-bold">{title}</h2>


      <div className="flex items-center">
        <PersonOutlineIcon className="h-4 w-4 fill-gray-400" />
        <span className="text-sm font-gilroy font-thin pl-1 text-gray-400">{creator}</span>
      </div>


      {description && (
        <p className="text-sm font-gilroy font-normal text-gray-500">{truncateDescription(description,100)}</p>
      )}


      <div className="flex items-center">
        <Rating 
          className='opacity-50'
          name="Rating" 
          value={stars} 
          precision={0.5} 
          size="small" 
          readOnly 
        />
        <span className="text-sm text-gray-500">({formatNumber(view)})</span>
      </div>


      <div className="flex items-center justify-start gap-1">
        <span className="text-xl font-gilroy font-semibold text-black">${formattedPrice}</span>
        <span className="text-sm text-gray-500 line-through">${formattedOldPrice}</span>
      </div>

    </div>
  )
}

export default CourseCard