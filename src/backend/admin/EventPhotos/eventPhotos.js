import supabase from "../../supabase";

export async function getAllEventPhotos() {
  const { data: eventPhotos, error } = await supabase
    .from("eventPhotos")

    .select("id,events(id,eventName), eventPhoto");

  if (error) {
    console.log("eventPhotos Error", error);
  }

  return eventPhotos;
}

export async function getEventPhotosByEvent(eventId) {
  const { data: eventPhotos, error } = await supabase
    .from("eventPhotos")

    .select("id,events(id,eventName), eventPhoto")
    .eq("eventId", eventId);

  if (error) {
    console.log("eventPhotos Error", error);
  }

  return eventPhotos;
}

export async function addEventPhoto({ eventPhoto, eventId }) {
  const { data: eventPhotos, error } = await supabase
    .from("eventPhotos")
    .insert({ eventPhoto, eventId })
    .select();

  if (error) {
    console.log("addEventPhoto Error", error);
  }

  return eventPhotos;
}

export async function removeEventPhotoById(id) {
  const { error } = await supabase.from("eventPhotos").delete().eq("id", id);

  if (error) {
    console.log("removeEventPhotoById Error", error);
  }

  return id;
}

export async function updateEventPhotoById({ id, eventPhoto, eventId }) {
  const { data: eventPhotos, error } = await supabase
    .from("eventPhotos")
    .update({ id, eventPhoto, eventId })
    .eq("id", id)
    .select();

  if (error) {
    console.log("updateEventPhotoById Error", error);
  }

  return eventPhotos;
}
