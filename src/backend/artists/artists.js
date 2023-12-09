import supabase from "../supabase";

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
