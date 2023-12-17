import supabase from "../supabase";
export async function getEventTickets() {
  try {
    const { data, error } = await supabase
      .from("ticketPricing")
      .select(
        "id,ticketCategories(id,categoryName,price), events(id,eventName)"
      );

    if (error) {
      console.error(error);
      throw new Error("Tickets could not be loaded");
    }

    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function getSoldTickets() {
  try {
    const { data, error } = await supabase
      .from("soldTickets")
      .select("*")
      .single();

    if (error) {
      console.error(error);
      throw new Error("soldTickets could not be loaded");
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
      .update({ availability: false, ticketId: null, status: "SOLD" })
      .eq("eventId", eventId)
      .eq("id", seatId);

    if (updateSeat.error) {
      console.error(updateSeat.error);
      throw new Error("Seat availability could not be updated");
    }

    const { error: updatedTicketPricingError } = await supabase
      .from("ticketPricing")
      .update({ isSold: true })
      .eq("id", ticketId);

    if (updatedTicketPricingError) {
      console.log(updatedTicketPricingError);
      throw new Error("Ticket pricing could not be updated");
    }

    // const { error: deleteError } = await supabase
    //   .from("ticketPricing")
    //   .delete()
    //   .eq("id", ticketId);

    // if (deleteError) {
    //   console.error(deleteError.error);
    //   throw new Error("Ticket pricing could not be deleted");
    // }

    const { data: soldCountData, error: soldCountError } = await supabase
      .from("soldTickets")
      .select("soldCount")
      .single();

    console.log("soldcountdata", soldCountData);

    if (soldCountError) {
      console.error(soldCountError);
      throw new Error("Sold count could not be fetched");
    }

    // soldCount değerini artır ve güncelle
    const updatedSoldCount = soldCountData.soldCount + 1;
    const { error: updateError } = await supabase
      .from("soldTickets")
      .update({ soldCount: updatedSoldCount })
      .eq("id", 1)
      .single();

    console.log("updatedsol", updatedSoldCount);

    if (updateError) {
      console.error(updateError);
      throw new Error("Sold count could not be updated");
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while buying the ticket");
  }
}
