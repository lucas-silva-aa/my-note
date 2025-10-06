import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);

  async function fetchNotes() {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setNotes(data);
  }

  async function addNote(note) {
    const { data, error } = await supabase.from("notes").insert([note]).select();
    if (!error && data) setNotes([data[0], ...notes]);
  }

  async function updateNote(id, updatedNote) {
    const { data, error } = await supabase
      .from("notes")
      .update(updatedNote)
      .eq("id", id)
      .select();
    if (!error) {
      setNotes(notes.map((n) => (n.id === id ? data[0] : n)));
    }
  }

  async function deleteNote(id) {
    await supabase.from("notes").delete().eq("id", id);
    setNotes(notes.filter((n) => n.id !== id));
  }

  async function getNote(id) {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", id)
    .single(); 

  if (error) {
    console.error("Erro ao buscar nota:", error.message);
    return null;
  }

  return data; 
}

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote, getNote  }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}
