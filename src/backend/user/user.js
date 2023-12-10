import supabase from "../supabase";

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("datauser", user);

  return user;
}

export async function signUp({ email, password, username }) {
  const {
    data: { user },
  } = await supabase.auth.signUp({
    username,
    email,
    password,
  });

  return user;
}

export async function signIn({ email, password }) {
  const { data: user, error } = await supabase.auth.signInWithPassword({
    email: "anilates.97@gmail.com",
    password: "12345678",
  });

  if (error) throw new Error(error.message);

  return user;
}

export async function logout({ email, password }) {
  console.log("data signin", email, password);
  const { data: user, error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);

  return user;
}

export async function fetchUsers() {
  try {
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
      console.error("Error:", error.message);
    } else {
      return data;
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}
