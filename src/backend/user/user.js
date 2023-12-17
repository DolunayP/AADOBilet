import supabase from "../supabase";

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  return user;
}

export async function getUserFromDatabase(userId) {
  if (!userId) return;

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

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

  const userData = {
    id: user.id,
    email: email,
    username: username,
    password: password,
    //authenticated: user.role,
    // Diğer gerekli kullanıcı bilgileri...
  };

  const { data, error: insertError } = await supabase
    .from("users")
    .insert([{ ...userData }]);

  if (insertError) {
    return { error: insertError };
  }

  return data;
}

export async function signIn({ email, password }) {
  const { data: user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return user;
}

export async function logout() {
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

export async function updateRoleOnLogin() {
  const { data: session } = supabase.auth.getSession();

  if (session) {
    const accessToken = session.access_token || session.token;

    const { error: updateError } = await supabase.auth.update({
      access_token: accessToken,
      role: "admin", // Değiştirilecek rol
    });

    if (updateError) {
      return { error: updateError };
    }
  }

  return null;
}
