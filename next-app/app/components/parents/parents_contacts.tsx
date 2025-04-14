import React from 'react'
import Parent from './parent'

interface parents_info {
  avatar_link: string,
  name: string,
  occupation: string,
  phone_number: string,
};


const parent1: parents_info = {
  avatar_link: "/images/uifaces-popular-image (1).jpg",
  name: "John Smith",
  occupation: "Software Engineer",
  phone_number: "+1 555-123-4567",
};

const parent2: parents_info = {
  avatar_link: "/images/uifaces-popular-image (3).jpg",
  name: "Lisa Johnson",
  occupation: "Doctor",
  phone_number: "+1 555-987-6543",
};

const parent3: parents_info = {
  avatar_link: "/images/uifaces-popular-image (2).jpg",
  name: "Michael Brown",
  occupation: "Teacher",
  phone_number: "+1 555-567-8901",
};


const parents_contacts = () => {
  return (
    <div className='justify-items-center ml-5 mt-20'>
      <p className='mb-4 text-5xl'>Parent's contacts</p>
      <p className='text-xl text-gray-400'>Here you can see parent's and their contacs</p>
      <Parent data={parent1} />
      <Parent data={parent2} />
      <Parent data={parent3} />
      <button className="mt-10 px-4 py-1 bg-gray-100 text-black rounded-full shadow-sm border border-gray-200 hover:bg-gray-200">
        Show all
      </button>
    </div>
  )
}

export default parents_contacts
