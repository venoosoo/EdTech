import React from 'react'

interface Emoji {
    emoji: string,
    amount: number

};

const reaction = ({ data }: { data: Emoji }) => {
  return (
    <div>
      <button className="max-h-9 px-4 py-1 bg-gray-100 text-black rounded-full whitespace-nowrap shadow-sm border border-gray-200 hover:bg-gray-200">
            {data.amount}{data.emoji}
      </button>
    </div>
  )
}

export default reaction
