import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getCategories,
  getArtists,
  getEventsWithArtist,
  getEvent,
} from "../backend/app";

const initialState = {
  events: [],
  eventById: [],
  categories: [],
  categoriesTest: [],
  artists: [],
  eventsWithArtists: [],
  event: {},
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
      });
  },
});

export default dataSlice.reducer;
