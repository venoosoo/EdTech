'use client';

import { useParams } from 'next/navigation';
import Header from '../../components/header';  // adjust path as needed
import EventDecs from '../../components/events/event_decs'; // adjust path as needed
import React from 'react';

const EventPage = () => {
  const params = useParams();

  // Get and convert ID safely
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;
  const id = idParam ? parseInt(idParam, 10) : undefined;

  // Handle invalid or missing ID
  if (id === undefined || isNaN(id)) {
    return <div>Invalid event ID</div>;
  }

  return (
    <div>
      <div className="xl:px-16 pt-5 pb-5 lg:pr-20">
        <Header />
      </div>
      <div>
        <EventDecs
          data2={{ date: '15.02.2025', title: 'Something' }}
          id={id}
        />
      </div>
    </div>
  );
};

export default EventPage;

