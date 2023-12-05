import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../redux/dataSlice';
import EventsComp from '../EventsComp/EventsComp';

const SearchComp = ({ word, date }) => {
    const { events } = useSelector((state) => state.data);
    const dispatch = useDispatch();
    const [searchedEvents, setSearchedEvents] = useState([]);

    useEffect(() => {
        dispatch(getData());
    }, [dispatch]);

    useEffect(() => {
        // DatePicker tarafından gelen tarihi database formatına çevirme
        const datePickerToDatabaseFormat = (datePickerDate) => {
            const [year, month, day] = datePickerDate.split('-');
            const databaseFormatDate = `${day}.${month}.${year}`;
            return databaseFormatDate;
        };

        // Etkinlikleri filtreleme
        const filteredEvents = events.filter((event) => {
            const eventName = event.eventName.toLowerCase();
            const eventDate = datePickerToDatabaseFormat(date);
            // Eğer sadece kelime filtresi varsa, sadece kelimeye göre filtrele
            if (word && !date) {
                return eventName.includes(word.toLowerCase());
            }

            // Eğer sadece tarih filtresi varsa, sadece tarihe göre filtrele
            if (!word && date) {
                return eventDate === event.eventDate;
            }
            // Hem kelime hem de tarih filtresi varsa, her ikisine göre filtrele

            return eventName.includes(word.toLowerCase()) && eventDate === event.eventDate;

        });
        console.log(filteredEvents)
        setSearchedEvents(filteredEvents);
    }, [word, date, events]);

    return (
        <>
            <EventsComp events={searchedEvents} />
        </>
    );
};

export default SearchComp;
