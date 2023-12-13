import supabase from "../../supabase";

export async function addCategory({ categoryName, categoryPhoto }) {
  console.log("databilgileri", categoryName, categoryPhoto);
  const { data: category, error } = await supabase
    .from("categories")
    .insert([{ name: categoryName, image: categoryPhoto }])
    .select();

  if (error) {
    console.log("addCategory Error", error);
  }

  return category;
}
