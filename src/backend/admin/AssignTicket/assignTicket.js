import supabase from "../../supabase";

export async function getTicketOfEvent(eventId) {
  try {
    const { data, error } = await supabase
      .from("ticketPricing")
      .select(
        "id,ticketCategories(id,categoryName,price), events(id,eventName), isAssign, isSold"
      )
      .eq("eventId", eventId);

    if (error) {
      console.error(error);
      throw new Error("Tickets could not be loaded");
    }

    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function createTicket({ categoryId, eventId }) {
  try {
    const { data, error } = await supabase
      .from("ticketPricing")
      .insert({ categoryId, eventId, isAssign: false, isSold: false });

    if (error) {
      console.error(error);
      throw new Error("Tickets could not be loaded");
    }

    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function assignTicket({ ticketId, id, eventId }) {
  console.log("assignticketdata", ticketId, id, eventId);
  try {
    const { data: seat, error } = await supabase
      .from("seats")
      .update({ availability: true, ticketId, eventId, status: "ASSIGNED" })
      .eq("id", id)
      .select();

    if (error) {
      console.error(error);
      throw new Error("Seats could not be loaded");
    }

    console.log("seat", seat);

    const { data: ticketPricing, errorTicket } = await supabase
      .from("ticketPricing")
      .update({ isAssign: true })
      .eq("id", ticketId)
      .select();

    if (errorTicket) {
      console.error(error);
      throw new Error("TicketPricing could not be loaded");
    }

    console.log("ticketPricing", ticketPricing);

    return { seat, ticketPricing };
  } catch (e) {
    console.log(e);
  }
}
