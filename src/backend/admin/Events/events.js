import supabase from "../../supabase";
const { v4: uuidv4 } = require("uuid");

export async function fetchEvents() {
  const { data: events, error } = await supabase
    .from("events")
    .select(
      "id,eventName,eventHour,eventFinishHour,eventDate,eventDesc,eventLocation, categories(*), isFree"
    );

  if (error) {
    console.log("fetchEvents", error);
  }

  return events;
}

export async function deleteEvent(id) {
  const { error } = await supabase.from("events").delete().eq("id", id);

  if (error) {
    console.log("deleteEvent", error);
  }

  return id;
}

export async function updateEvent({
  id,
  name,
  hour,
  finishHour,
  date,
  location,
  category,
  isFree,
}) {
  const { data: events, error } = await supabase
    .from("events")
    .update({
      eventName: name,
      eventHour: hour,
      eventFinishHour: finishHour,
      eventDate: date,
      eventLocation: location,
      categoryId: category,
      isFree,
    })
    .eq("id", id)
    .select();

  if (error) {
    console.log("updateEvent", error);
  }

  return events;
}

export async function addEvent({
  artists,
  name,
  hour,
  finishHour,
  date,
  desc,
  location,
  category,
  isFree,
}) {
  const EVENT_ID = uuidv4();

  console.log("EVENTIDDD CHECK-->", EVENT_ID);
  const { error } = await supabase
    .from("events")
    .insert({
      id: EVENT_ID,
      eventName: name,
      eventHour: hour,
      eventFinishHour: finishHour,
      eventDate: date,
      eventDesc: desc,
      eventLocation: location,
      categoryId: category,
      isFree,
    })
    .select();

  if (error) {
    console.log("events", error);
  }

  const { data: eventsWithArtist, error: eventWithArtistError } = await supabase
    .from("event_artists")
    .insert(artists.map((artistId) => ({ eventId: EVENT_ID, artistId })))
    .select();

  if (eventWithArtistError) {
    console.log("eventWithArtistError", error);
  }

  return eventsWithArtist;
}
