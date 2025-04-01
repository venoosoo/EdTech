import React from 'react';
import Post from './Post';
import Post_comment from './post_comment';
import { useNotification } from '@/app/context/NotificationContent';



interface event {
  date: string,
  title: string,
};


interface post {
  avatar_link: string,
  name: string,
  job: string,
  text: string,
  date: string,
};

const dataList: post[] = [
  {
    avatar_link: "https://api.dicebear.com/7.x/personas/svg?seed=James",
    name: "James Carter",
    job: "Software Engineer",
    text: "Technology is best when it brings people together. The world is changing, and innovation is key to success.",
    date: "March 10, 4:45 PM",
  },
  {
    avatar_link: "https://api.dicebear.com/7.x/personas/svg?seed=Sophia",
    name: "Sophia Bennett",
    job: "Marketing Manager",
    text: "Marketing is about telling stories that connect with people. Data-driven decisions lead to the best results.",
    date: "April 5, 1:20 PM",
  },
  {
    avatar_link: "https://api.dicebear.com/7.x/personas/svg?seed=Lily",
    name: "Lily King",
    job: "Science",
    text: "Lorem Ipsum - это текст-'рыба', часто используемый в печати и веб-дизайне. Этот текст является стандартной 'рыбой' для текстов на латинице.",
    date: "January 25, 2:11 PM",
  },
  {
    avatar_link: "https://api.dicebear.com/7.x/personas/svg?seed=Daniel",
    name: "Daniel Wright",
    job: "UX Designer",
    text: "Design is not just what it looks like; design is how it works. A great user experience comes from deep understanding.",
    date: "February 14, 9:30 AM",
  },
  {
    avatar_link: "https://api.dicebear.com/7.x/personas/svg?seed=Emma",
    name: "Emma Davis",
    job: "Project Manager",
    text: "A goal without a plan is just a wish. Effective management is about organization and adaptability.",
    date: "May 21, 7:00 PM",
  },
  {
    avatar_link: "https://api.dicebear.com/7.x/personas/svg?seed=Liam",
    name: "Liam Johnson",
    job: "Cybersecurity Analyst",
    text: "Security isn’t just a feature—it’s a necessity. Protecting data is more important than ever.",
    date: "June 8, 12:05 PM",
  },
  {
    avatar_link: "https://api.dicebear.com/7.x/personas/svg?seed=Olivia",
    name: "Olivia Brown",
    job: "Data Scientist",
    text: "Data is the new oil. The future belongs to those who understand how to analyze and use it effectively.",
    date: "July 2, 3:15 PM",
  },
  {
    avatar_link: "https://api.dicebear.com/7.x/personas/svg?seed=Noah",
    name: "Noah Wilson",
    job: "Entrepreneur",
    text: "Opportunities don't happen. You create them. Entrepreneurship is about taking risks and innovating.",
    date: "August 19, 5:40 PM",
  },
];
  



interface comment {
  avatar: string,
  name: string,
  text: string,
  date: string,
  
}

const comments: comment[] = [
  {
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "John Doe",
    text: "This is an interesting post! Thanks for sharing.",
    date: "2025-03-25",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    name: "Jane Smith",
    text: "I totally agree with your point. Well said!",
    date: "2025-03-24",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    name: "Michael Johnson",
    text: "Does anyone have more resources on this topic?",
    date: "2025-03-23",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    name: "Emily Brown",
    text: "Loved reading this! Keep up the great work.",
    date: "2025-03-22",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/89.jpg",
    name: "David Wilson",
    text: "Interesting perspective. I hadn't thought of it that way before.",
    date: "2025-03-21",
  }
];


const EventDecs = ({ data2, id }: { data2: event, id: number }) => {
  const { addNotification } = useNotification(); // Get the function to add notifications
  
    // Function to handle the "Add to Calendar" button click
    const handleAddToCalendar = () => {
      const Message = `${data2.title} is coming soon`
      addNotification(Message); // Add the notification using context
    };

  if (id != null) {
    {/* get the data from db */}
  }

  return (
    

    <>
      <div className="b ml-5 p-4">
        <p className="text-2xl text-gray-400">
          Date: <span className="text-black">{data2.date}</span>
        </p>
        {/* Flex container for title and button/SVGs */}
        <div className="flex justify-between items-center mt-3">
          <p className="text-3xl">{data2.title}</p>
          <div className="flex mr-16 items-center space-x-4">
            <button 
            onClick={handleAddToCalendar}
            className="max-h-14 px-4 py-1 bg-gray-100 text-lg text-black rounded-full whitespace-nowrap shadow-sm border border-gray-200 hover:bg-gray-200">
              + Add to calendar
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="ml-16 mt-5 relative">
      <Post data={dataList[id]} />
      
      {/* Scrollable comments section */}
      <div className="h-[600px] overflow-y-auto space-y-5 mt-5 ml-16 pb-24">
        {comments.map((test, index) => (
          <Post_comment key={index} data={test} />
        ))}
      </div>

      {/* Input & Button at the bottom */}
      <div className="absolute bottom-0 left-0 w-full  flex items-center bg-[#F7F6F2] p-2">
        <input 
          type="text"  
          placeholder="Type your message here..." 
          className="border text-xl h-16 bg-white p-2 rounded-lg flex-grow min-w-0"
        />
        <button className="bg-black text-white w-16 h-16 flex-shrink-0">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="size-10 mx-auto"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
          </svg>
        </button>
      </div>
    </div>


    </>
  );
};

export default EventDecs;
