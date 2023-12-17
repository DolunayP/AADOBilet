import supabase from "../../supabase";

export async function addArtist({ artistName, artistPhoto }) {
  const { data: category, error } = await supabase
    .from("artists")
    .insert({ artistName, artistPhoto })
    .select();

  if (error) {
    console.log("addArtist Error", error);
  }

  return category;
}

export async function removeArtistById(id) {
  const { error } = await supabase.from("artists").delete().eq("id", id);

  if (error) {
    console.log("removeArtistById Error", error);
  }

  return id;
}

export async function updateArtistById({ id, artistName, artistPhoto }) {
  const { data: category, error } = await supabase
    .from("artists")
    .update({ artistName, artistPhoto })
    .eq("id", id)
    .select();

  if (error) {
    console.log("updateArtistById Error", error);
  }

  return category;
}
