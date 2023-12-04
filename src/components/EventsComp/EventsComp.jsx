import React, { useEffect } from 'react';
import EventsCard from './EventsCard';
import { useDispatch } from 'react-redux';
import { getData } from '../../redux/dataSlice';

const EventsComp = ({ events, path }) => {
    const dispatch = useDispatch();

    console.log(path)
    useEffect(() => {
        dispatch(getData());
    }, [dispatch]);

    const currentDate = new Date();
    const convertToDate = (dateString) => {
        const [day, month, year] = dateString.split('.');
        return new Date(`${year}-${month}-${day}`);
    };
    const filteredByDate = events.filter((event) => {
        const eventDate = convertToDate(event.eventDate);
        const isPast = () => {
            if (path === '/pastevents') {
                return eventDate < currentDate;
            } else {
                return eventDate >= currentDate;
            }
        }
        return isPast();
    });

    return (
        <div className='flex gap-8 justify-center items-center my-12 px-10 flex-wrap'>
            {filteredByDate.map((event, i) => (
                <EventsCard key={i} event={event} />
            ))}
        </div>
    );
};

export default EventsComp;