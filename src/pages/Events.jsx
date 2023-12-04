import React, { useEffect, useState } from 'react';
import HeaderView from '../components/Header/HeaderView';
import EventsComp from '../components/EventsComp/EventsComp';
import FilterCategories from '../components/FilterCategories/FilterCategories';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../redux/dataSlice';

const Events = () => {
    const { events } = useSelector((state) => state.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getData());
    }, [dispatch]);

    const [filteredEvents, setFilteredEvents] = useState(events);

    const handleCategorySelect = (category) => {
        if (category === '') {
            setFilteredEvents(events);
        } else {
            const filtered = events.filter((event) => event.eventCategory === category);
            setFilteredEvents(filtered);
        }
    };

    return (
        <>
            <HeaderView />
            <FilterCategories events={events} onSelectCategory={handleCategorySelect} />
            <div className='my-4 font-bold text-4xl text-[#32847a]'>INCOMING EVENTS</div>
            <EventsComp events={filteredEvents} />
        </>
    );
};

export default Events;