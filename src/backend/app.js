import supabase from "./supabase";

export async function getCategories() {
  try {
    const { data, error } = await supabase.from("categories").select("*");

    if (error) {
      console.error(error);
      throw new Error("Categories could not be loaded");
    }
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function getEventPhotos(eventId) {
  try {
    const { data, error } = await supabase
      .from("eventPhotos")
      .select("*")
      .eq("eventId", eventId);
    if (error) {
      console.error(error);
      throw new Error("eventPhotos could not be loaded");
    }

    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function getArtists() {
  try {
    const { data, error } = await supabase.from("artists").select("*");

    if (error) {
      console.error(error);
      throw new Error("Artists could not be loaded");
    }

    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function getEventsWithArtist() {
  try {
    const { data: eventArtists, error: eventArtistsError } = await supabase
      .from("event_artists")
      .select("eventId, artistId");

    if (eventArtistsError) {
      console.error("Event artists error:", eventArtistsError);
      throw new Error("Event artists could not be loaded");
    }

    const eventsWithArtistsAndCategories = {};

    for (const eventArtist of eventArtists) {
      const { eventId, artistId } = eventArtist;

      if (!eventsWithArtistsAndCategories[eventId]) {
        const { data: eventData, error: eventError } = await supabase
          .from("events")
          .select(
            "id, eventName, eventHour, eventFinishHour, eventDate, eventDesc, eventLocation, categoryId, ticketPrice"
          )
          .eq("id", eventId)
          .single();
        if (eventError) {
          console.error("Event error:", eventError);
          throw new Error("Event could not be loaded");
        }

        const { data: categoryData, error: categoryError } = await supabase
          .from("categories")
          .select("id, name, image")
          .eq("id", eventData.categoryId)
          .single();

        if (categoryError) {
          console.error("Category error:", categoryError);
          throw new Error("Category could not be loaded");
        }

        eventsWithArtistsAndCategories[eventId] = {
          event: {
            ...eventData,
            category: categoryData,
            artists: [],
          },
        };
      }

      const { data: artistData, error: artistError } = await supabase
        .from("artists")
        .select("id, artistName, artistPhoto")
        .eq("id", artistId)
        .single();

      if (artistError) {
        console.error("Artist error:", artistError);
        throw new Error("Artist could not be loaded");
      }

      eventsWithArtistsAndCategories[eventId].event.artists.push(artistData);
    }

    const result = Object.values(eventsWithArtistsAndCategories).map(
      (eventWithCategory) => eventWithCategory.event
    );

    return result;
  } catch (error) {
    console.error("Error fetching events with artists and categories:", error);
    throw new Error("Events with artists and categories could not be loaded");
  }
}
export async function getEvent(eventId) {
  try {
    const { data: eventData, error: eventError } = await supabase
      .from("events")
      .select(
        "id, eventName, eventHour, eventFinishHour, eventDate, eventDesc, eventLocation, categoryId, ticketPrice"
      )
      .eq("id", eventId)
      .single();

    if (eventError) {
      console.error("Event error:", eventError);
      throw new Error("Event could not be loaded");
    }

    const { data: categoryData, error: categoryError } = await supabase
      .from("categories")
      .select("id, name, image")
      .eq("id", eventData.categoryId)
      .single();

    if (categoryError) {
      console.error("Category error:", categoryError);
      throw new Error("Category could not be loaded");
    }

    const { data: artistIds, error: artistIdsError } = await supabase
      .from("event_artists")
      .select("artistId")
      .eq("eventId", eventId);

    if (artistIdsError) {
      console.error("Artist IDs error:", artistIdsError);
      throw new Error("Artist IDs could not be loaded");
    }

    const artistIdsArray = artistIds.map((artist) => artist.artistId);

    const { data: artistsData, error: artistsError } = await supabase
      .from("artists")
      .select("id, artistName, artistPhoto")
      .in("id", artistIdsArray);

    if (artistsError) {
      console.error("Artists error:", artistsError);
      throw new Error("Artists could not be loaded");
    }

    const eventWithArtistsAndCategory = {
      event: {
        ...eventData,
        category: categoryData,
        artists: artistsData,
      },
    };

    return eventWithArtistsAndCategory;
  } catch (error) {
    console.error("Error fetching event with artists and category:", error);
    throw new Error("Event with artists and category could not be loaded");
  }
}

export async function getSeats(eventId) {
  try {
    const { data, error } = await supabase
      .from("seats")
      .select("*, ticketPricing(ticketCategories(categoryName,price))")
      .eq("eventId", eventId);

    if (error) {
      console.error(error);
      throw new Error("Seats could not be loaded");
    }

    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function getEventTickets(eventId) {
  console.log("eventId app.js", eventId);
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

export async function selectSeat(seatId) {
  try {
    const { data, error } = await supabase
      .from("seats")
      .select(
        "id,seatName,availability, events(id,eventName,eventDate, eventLocation, isFree),  ticketPricing(id, ticketCategories(categoryName,price)) "
      )
      .eq("id", seatId)
      .single();

    if (error) {
      console.error(error);
      throw new Error("Seats could not be loaded");
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
