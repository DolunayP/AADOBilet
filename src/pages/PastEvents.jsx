import React, { useEffect } from 'react'
import HeaderView from '../components/Header/HeaderView'
import EventsComp from '../components/EventsComp/EventsComp'
import { useDispatch, useSelector } from 'react-redux';
import { getArtistWithEvents, getData } from '../redux/dataSlice';
import { useLocation } from 'react-router-dom';

const PastEvents = () => {
    const location = useLocation();
    const path = location.pathname;

    const { eventsWithArtists } = useSelector((state) => state.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getArtistWithEvents());
    }, [dispatch]);
    return (
        <>
            <HeaderView />
            <div className='my-4 font-bold text-[52px] text-[#32847a]'>
                Geçmiş Etkinlikler
            </div>
            <EventsComp events={eventsWithArtists} path={path}/>
        </>
    )
}

export default PastEvents