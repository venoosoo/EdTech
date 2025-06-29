import React from 'react'
import Image from "next/image"

interface parents_info {
  avatar_link: string,
  name: string,
  occupation: string,
  phone_number: string,
};




const parent = ({ data }: { data: parents_info }) => {
  return (
    <div className='mt-10 flex'>
      <div className="mr-4">
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300 shadow-lg">
          <Image src={data.avatar_link} alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="">
        <div className="text-xl">{data.name}</div>
        <div className="text-sm text-gray-400">{data.occupation}</div>
      </div>
      <div className="ml-10 number">{data.phone_number}</div>
    </div>
  )
}

export default parent
