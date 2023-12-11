import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getCategories } from "../backend/categories/categories";
import {
  getEvent,
  getEventPhotos,
  getEventsWithArtist,
} from "../backend/events/events";
import { getArtists } from "../backend/artists/artists";
import { getSeats, selectSeat } from "../backend/seats/seats";
import {
  buyTicket,
  getEventTickets,
  getSoldTickets,
} from "../backend/tickets/tickets";
import {
  fetchUsers,
  getUser,
  getUserFromDatabase,
  logout,
  signIn,
  signUp,
} from "../backend/user/user";

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
  users: [],
  user: {},
  userSession: {},
  userData: {},
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

export const getUsers = createAsyncThunk("fetchusers", async () => {
  const data = await fetchUsers();

  return data;
});

export const getUserSession = createAsyncThunk("getUser", async () => {
  const data = await getUser();

  return data;
});

export const getUserSessionDatabase = createAsyncThunk(
  "getUserdata",
  async (userId) => {
    const data = await getUserFromDatabase(userId);

    return data;
  }
);

export const login = createAsyncThunk("login", async ({ email, password }) => {
  const data = await signIn({ email, password });

  return data;
});

export const logoutUser = createAsyncThunk("logout", async () => {
  const data = await logout();

  console.log("logout", data);

  return data;
});

export const register = createAsyncThunk(
  "register",
  async ({ email, password, username }) => {
    const data = await signUp({ email, password, username });

    console.log("data register", data);

    return data;
  }
);

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

export const getSoldTicketsData = createAsyncThunk("soldticket", async () => {
  const data = await getSoldTickets();

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
      .addCase(getSoldTicketsData.fulfilled, (state, action) => {
        state.soldTickets = action.payload;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        const registeredUser = action.payload;

        state.users = [...state.users, registeredUser];
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userSession = action.payload;
      })

      .addCase(getUserSession.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUserSessionDatabase.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = {};
      });
  },
});

export default dataSlice.reducer;
