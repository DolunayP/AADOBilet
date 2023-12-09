import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getCategories,
  getArtists,
  getEventsWithArtist,
  getEvent,
  getEventPhotos,
  getSeats,
  buyTicket,
  getEventTickets,
  selectSeat,
} from "../backend/app";

const initialState = {
  events: [],
  eventById: [],
  categories: [],
  categoriesTest: [],
  artists: [],
  eventsWithArtists: [],
  event: {},
  eventPhotos: [],
  seats: [],
  eventTickets: [],
  selectedSeat: {},
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

export const getData = createAsyncThunk("event", async () => {
  try {
    const res = await axios.get("http://localhost:3000/data");
    const data = res.data;
    return data;
  } catch (error) {
    console.error(error);
  }
});

export const getCategory = createAsyncThunk("category", async () => {
  try {
    const res = await axios.get("http://localhost:3000/data");
    const data = res.data.map((item) => {
      return {
        eventCategory: {
          name: item.eventCategory.name.toLowerCase(),
          image: item.eventCategory.image,
        },
      };
    });
    const uniqueCategories = [...new Set(data)];
    return uniqueCategories;
  } catch (error) {
    console.error(error);
  }
});

export const getEventById = createAsyncThunk("eventid", async (eventId) => {
  try {
    const res = await axios.get(`http://localhost:3000/data/${eventId}`);
    const data = res.data;
    return data;
  } catch (error) {
    console.error(error);
  }
});

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        state.events = action.payload;
      })
      .addCase(getEventById.fulfilled, (state, action) => {
        state.eventById = action.payload;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
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
      });
  },
});

export default dataSlice.reducer;
