import React from 'react'

interface grade {
  grade_letter: string,
  grade_number: number,
  time: string,
};

const child_score = ({ data }: { data: grade }) => {
  return (
    <div className='items-center min-w-[475px] m-5 mt-16'>
      <p className=" leading-tight text-6xl">
        Keep
        <span className="text-gray-400"> Your</span><br />
        <span>Children's success</span>
      </p>
      <p className='text-gray-400 mt-12 text-xl'>Grinding in education</p>
      <div>
        {/* Make function to converts precents in grade */}
        <p className='text-8xl'>{data.grade_letter}, {data.grade_number}%</p>
      </div>
      {/* Also add later auto add */}
      <p className='mt-10 text-2xl'>
        <span className=' text-gray-400'>Lastest update added: </span>
        <span className='font-bold'>{data.time}</span>
        </p>
      
    </div>
  )
}

export default child_score
