import supabase from "../supabase";
export async function getEventTickets(eventId) {
  try {
    const { data, error } = await supabase.from("ticketPricing").select("*");

    if (error) {
      console.error(error);
      throw new Error("Tickets could not be loaded");
    }

    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function buyTicket(eventId, seatId, ticketId) {
  console.log("eventId =>", eventId, "seatId =>", seatId);
  try {
    const updateSeat = await supabase
      .from("seats")
      .update({ availability: false, ticketId: null })
      .eq("eventId", eventId)
      .eq("id", seatId);

    if (updateSeat.error) {
      console.error(updateSeat.error);
      throw new Error("Seat availability could not be updated");
    }

    const { error: deleteError } = await supabase
      .from("ticketPricing")
      .delete()
      .eq("id", ticketId);

    if (deleteError) {
      console.error(deleteError.error);
      throw new Error("Ticket pricing could not be deleted");
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while buying the ticket");
  }
}
