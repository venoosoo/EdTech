import React from 'react'
import Reaction from '../reaction'
import Image from "next/image"

interface comment {
  avatar: string,
  name: string,
  text: string,
  date: string,
  
}


const post_comment = ({data}: {data: comment}) => {
  return (
    <div className='border-l-2 border-gray-300 pl-4'>
      <div className='flex items-center'>
        <div className="mr-4 w-14 ml-10 h-14 rounded-full overflow-hidden border-2 border-gray-300 shadow-lg">
            <Image src={data.avatar} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <p className='text-2xl'>{data.name}</p>
      </div>
      <div className='ml-12 mt-5 max-w-5xl mr-16'>
            <p className='whitespace-normal'>
            {data.text}
             </p>
      </div>
      <div className='flex space-x-3 ml-12 items-center mt-4'>
        <Reaction data={{ amount: 2, emoji: "👍" }} />
        <div className='flex-grow ml-auto'>
          <p className='text-right mr-16 flex-grow text-gray-400 '>{data.date}</p>
        </div>
      </div>
    </div>
  )
}

export default post_comment
