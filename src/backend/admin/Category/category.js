import supabase from "../../supabase";

export async function addCategory({ categoryName, categoryPhoto }) {
  const { data: category, error } = await supabase
    .from("categories")
    .insert([{ name: categoryName, image: categoryPhoto }])
    .select();

  if (error) {
    console.log("addCategory Error", error);
  }

  return category;
}

export async function removeCategoryById(id) {
  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {
    console.log("removeCategoryById Error", error);
  }

  return id;
}

export async function updateCategoryById({ id, categoryName, categoryPhoto }) {
  const { data: category, error } = await supabase
    .from("categories")
    .update({ name: categoryName, image: categoryPhoto })
    .eq("id", id)
    .select();

  if (error) {
    console.log("updateCategoryById Error", error);
  }

  return category;
}
