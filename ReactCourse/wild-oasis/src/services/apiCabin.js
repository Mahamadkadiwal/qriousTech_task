import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // ✅ If it's a string URL, skip file naming logic
  const imageName = hasImagePath
    ? null
    : `${Math.random()}-${newCabin.image?.name || "cabin-image"}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-image/${imageName}`;

  // 1️⃣ Create or edit cabin
  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2️⃣ Skip upload if already has Supabase URL
  if (hasImagePath) return data;

  // 3️⃣ Upload only if it’s a new File
  const { error: storageError } = await supabase.storage
    .from("cabin-image")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Cabin image could not be uploaded and the cabin was not created");
  }

  return data;
}


export async function deleteCabin(id){
    const { data, error } = await supabase
  .from('cabins')
  .delete()
  .eq('id', id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}