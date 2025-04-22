import React from 'react'
import Reaction from '../reaction'


interface post {
  avatar_link: string,
  name: string,
  job: string,
  text: string,
  date: string,
};





const Post = ({ data }: { data: post }) => {
  return (
    <div>
      <div className='flex mt-5 items-center'>
          <div className="mr-4 w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 shadow-lg">
            <img src={data.avatar_link} alt="Profile" className="w-full h-full object-cover" />
          </div>
            <div>
                <p className='text-xl'>{data.name}</p>
                <p className='text-gray-400 text-xl '>{data.job}</p>
            </div>
        </div>
        <div className='pl-4 rounded-xl xl:ml-16 pt-3 mt-4 pb-5 bg-white max-w-5xl mr-16'>
            <p className='whitespace-normal'>
            {data.text}
             </p>
        </div>
        <div className='xl:ml-16  mt-4 mr-16 items-center flex space-x-2'>
            <Reaction data={{ amount: 2, emoji: "👍" }} />
            <Reaction data={{ amount: 7, emoji: "👍" }} />
            <Reaction data={{ amount: 4, emoji: "⚡" }} />
            <p className='text-right mr-16 flex-grow text-gray-400'>{data.date}</p>
        </div>
        <div>
          <p className='ml-16 mt-7 text-gray-400 text-xl'>Total: <span className='text-black'>37 comments</span></p>  
        </div>  
    </div>
    
  )
}

export default Post
