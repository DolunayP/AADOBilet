import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getCategories } from "../backend/categories/categories";
import {
  getEvent,
  getEventPhotos,
  getEventsWithArtist,
} from "../backend/events/events";
import { getArtists } from "../backend/artists/artists";
import { getSeats, getTicketsSold, selectSeat } from "../backend/seats/seats";
import { buyTicket, getEventTickets } from "../backend/tickets/tickets";

const initialState = {
  categories: [],
  categoriesTest: [],
  artists: [],
  eventsWithArtists: [],
  event: {},
  eventPhotos: [],
  seats: [],
  eventTickets: [],
  selectedSeat: {},
  soldTickets: {},
};

export const getCategoryTest = createAsyncThunk("testCategory", async () => {
  const data = await getCategories();

  return data;
});

export const getArtistTest = createAsyncThunk("artists", async () => {
  const data = await getArtists();

  return data;
});

export const getArtistWithEvents = createAsyncThunk("eventartist", async () => {
  const data = await getEventsWithArtist();

  return data;
});

export const getEventSingle = createAsyncThunk("getevent", async (eventId) => {
  const data = await getEvent(eventId);

  return data;
});

export const getPhotosByEvent = createAsyncThunk(
  "geteventphotos",
  async (eventId) => {
    const data = await getEventPhotos(eventId);

    return data;
  }
);

export const getSeatsByEvent = createAsyncThunk("seats", async (eventId) => {
  const data = await getSeats(eventId);

  return data;
});

export const getTickets = createAsyncThunk("gettickets", async (eventId) => {
  const data = await getEventTickets(eventId);

  return data;
});

export const getSoldTickets = createAsyncThunk("soldticket", async () => {
  const data = await getTicketsSold();

  return data;
});

export const buyTicketOfEvent = createAsyncThunk(
  "buyTicket",
  async ({ eventId, seatId, ticketId }) => {
    const data = await buyTicket(eventId, seatId, ticketId);

    console.log("dataa", data);

    return data;
  }
);

export const selectSeatByUser = createAsyncThunk(
  "selectseat",
  async (seatId) => {
    const data = await selectSeat(seatId);

    console.log("dataa", data);

    return data;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: [],
  extraReducers: (builder) => {
    builder

      .addCase(getCategoryTest.fulfilled, (state, action) => {
        state.categoriesTest = action.payload;
      })
      .addCase(getArtistTest.fulfilled, (state, action) => {
        state.artists = action.payload;
      })
      .addCase(getArtistWithEvents.fulfilled, (state, action) => {
        state.eventsWithArtists = action.payload;
      })
      .addCase(getEventSingle.fulfilled, (state, action) => {
        state.event = action.payload;
      })
      .addCase(getPhotosByEvent.fulfilled, (state, action) => {
        state.eventPhotos = action.payload;
      })
      .addCase(getSeatsByEvent.fulfilled, (state, action) => {
        state.seats = action.payload;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.eventTickets = action.payload;
      })
      .addCase(buyTicketOfEvent.fulfilled, (state, action) => {
        console.log("addcase", action.payload);
        const updatedSeats = state.seats.map((seat) => {
          if (
            seat.id === action.payload.seatId &&
            seat.eventId === action.payload.eventId
          ) {
            return {
              ...seat,
              availability: false,
            };
          }
          return seat;
        });

        state.seats = updatedSeats;

        state.eventTickets = state.eventTickets.filter(
          (ticket) =>
            ticket.ticketId !== action.payload.seatId &&
            ticket.eventId === action.payload.eventId
        );
      })
      .addCase(selectSeatByUser.fulfilled, (state, action) => {
        state.selectedSeat = action.payload;
      })
      .addCase(getSoldTickets.fulfilled, (state, action) => {
        state.soldTickets = action.payload;
      });
  },
});

export default dataSlice.reducer;
