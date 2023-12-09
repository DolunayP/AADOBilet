import supabase from "../supabase";

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
