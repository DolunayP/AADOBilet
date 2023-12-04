import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    events: [],
    eventById: [],
}

export const getData = createAsyncThunk('event', async () => {
    try {
        const res = await axios.get("http://localhost:3000/data");
        const data = res.data;
        return data;
    } catch (error) {
        console.error(error);
    }
});
export const getEventById = createAsyncThunk('eventid', async (eventId) => {
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

    }
})

export default dataSlice.reducer