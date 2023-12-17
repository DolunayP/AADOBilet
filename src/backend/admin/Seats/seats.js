import supabase from "../../supabase";

export async function getAllSeats() {
  try {
    const { data: seats, error } = await supabase
      .from("seats")
      .select("events(id,eventName),id,seatName,availability, ticketId,status");

    if (error) {
      console.error(error);
      throw new Error("Seats could not be loaded");
    }

    return seats;
  } catch (e) {
    console.log(e);
  }
}

export async function getSeatsAdmin(eventId) {
  try {
    const { data: seats, error } = await supabase
      .from("seats")
      .select("events(id,eventName),id,seatName,availability, ticketId,status")
      .eq("eventId", eventId);

    if (error) {
      console.error(error);
      throw new Error("Seats could not be loaded");
    }

    return seats;
  } catch (e) {
    console.log(e);
  }
}

export async function addSeat({ eventId, seatName }) {
  const { data: seats, error } = await supabase
    .from("seats")
    .insert({ eventId, seatName, availability: false, status: "CREATED" })
    .select();

  if (error) {
    console.log("addSeat Error", error);
  }

  return seats;
}

export async function removeSeatById(id) {
  const { error } = await supabase.from("seats").delete().eq("id", id);

  if (error) {
    console.log("removeSeatById Error", error);
  }

  return id;
}

export async function updateSeatById({ id, eventId, seatName, availability }) {
  const { data: seats, error } = await supabase
    .from("seats")
    .update({ id, eventId, seatName, availability })
    .eq("id", id)
    .select();

  if (error) {
    console.log("updateSeatById Error", error);
  }

  return seats;
}
