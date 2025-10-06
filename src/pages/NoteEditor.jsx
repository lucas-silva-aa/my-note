import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import "../App.css";
import Icone from "../images/icone.svg";


export default function NoteEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addNote, updateNote, getNote } = useNotes();

  const noteId = id ? Number(id) : null; 
  const existingNote = noteId !== null ? getNote(noteId) : null;

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const [status, setStatus] = useState("Feito");
  const [content, setContent] = useState("");

  const lastEdit = new Date().toLocaleDateString();

useEffect(() => {
  async function fetchExistingNote() {
    if (noteId !== null) {
      const note = await getNote(noteId);
      if (note) {
        setTitle(note.title || "");
        setPriority(note.priority || "low");
        setStatus(note.status || "Feito");
        setContent(note.content || "");
      }
    }
  }
  fetchExistingNote();
}, [noteId]);

  const handleSave = () => {
    const noteData = { title, priority, status, content };
    if (noteId !== null) {
      updateNote(noteId, noteData);
    } else {
      addNote(noteData);
    }
    navigate("/dashboard");
  };

  return (
    <div className="note-editor-container">
      <header className="dashboard-header">
        <h1 className="dashboard-logo">
          <img src={Icone} alt="logo" />
          My_Note</h1>
        <div className="dashboard-actions">
          <span className="icon">⚙️</span>
          <div className="avatar">J</div>
        </div>
      </header>

      <div className="note-editor-wrapper">
        <div className="note-editor-card">
          <input
            type="text"
            placeholder="Nome da Nota"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="note-input"
          />

          <div className="note-options">
            <div className="priority-section">
              <span>Prioridade:</span>
              <button
                className={`priority-dot red ${priority === "high" ? "active" : ""}`}
                onClick={() => setPriority("high")}
              />
              <button
                className={`priority-dot yellow ${priority === "medium" ? "active" : ""}`}
                onClick={() => setPriority("medium")}
              />
              <button
                className={`priority-dot green ${priority === "low" ? "active" : ""}`}
                onClick={() => setPriority("low")}
              />
            </div>

            <div className="status-section">
              <span>Status:</span>
              {["Feito", "Em Progresso", "Parado", "Cancelado"].map((st) => (
                <button
                  key={st}
                  className={`status-btn ${status === st ? "active" : ""}`}
                  onClick={() => setStatus(st)}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <textarea
            placeholder="Escreva sua nota"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="note-textarea"
          />

          <div className="note-footer">
            <span className="last-edit">última edição {lastEdit}</span>
            <div className="footer-buttons">
              <button onClick={() => navigate("/dashboard")} className="secondary-btn small-btn">
                Voltar
              </button>
              <button onClick={handleSave} className="primary-btn small-btn">
                Salvar
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
