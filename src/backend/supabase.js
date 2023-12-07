import { createClient } from "@supabase/supabase-js";
//import "dotenv/config";
const supabaseUrl = "https://tqaezoxzpwzknjoucfxx.supabase.co";

//console.log(process.env);

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxYWV6b3h6cHd6a25qb3VjZnh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE4OTU3MzYsImV4cCI6MjAxNzQ3MTczNn0._Vnkhm5cOkTxv7nJxd4Z0IAlJ3fLfKL61tO_GY9X1Oo";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
