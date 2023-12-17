import supabase from "../../supabase";

export async function getTicketCategories() {
  const { data: ticketCategories, error } = await supabase
    .from("ticketCategories")

    .select("id, categoryName, events(id,eventName), price");

  if (error) {
    console.log("getTicketCategories Error", error);
  }

  return ticketCategories;
}

export async function addTicketCategory({ categoryName, eventId, price }) {
  const { data: ticketCategories, error } = await supabase
    .from("ticketCategories")
    .insert([{ categoryName, eventId, price }])
    .select();

  if (error) {
    console.log("addTicketCategory Error", error);
  }

  return ticketCategories;
}

export async function removeTicketCategoryById(id) {
  const { error } = await supabase
    .from("ticketCategories")
    .delete()
    .eq("id", id);

  if (error) {
    console.log("removeTicketCategoryById Error", error);
  }

  return id;
}

export async function updateTicketCategoryById({
  id,
  categoryName,
  eventId,
  price,
}) {
  const { data: ticketCategories, error } = await supabase
    .from("ticketCategories")
    .update({ id, categoryName, eventId, price })
    .eq("id", id)
    .select();

  if (error) {
    console.log("updateTicketCategoryById Error", error);
  }

  return ticketCategories;
}

export async function getTicketCategoriesByEventId(eventId) {
  const { data: ticketCategory, error } = await supabase
    .from("ticketCategories")
    .select("*")
    .eq("eventId", eventId);

  if (error) {
    console.log("getTicketCategoriesByEventId Error", error);
  }

  return ticketCategory;
}
