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
  const isEditing = noteId !== null;

  // Estados da nota
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const [status, setStatus] = useState("Feito");
  const [content, setContent] = useState("");

  // Data da última edição
  const lastEdit = new Date().toLocaleDateString();

  // Busca nota existente ao carregar componente (se estiver editando)
  useEffect(() => {
    async function fetchExistingNote() {
      if (isEditing) {
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
  }, [isEditing, noteId, getNote]);

  // Salva ou atualiza nota e redireciona para dashboard
  const handleSave = () => {
    const noteData = { title, priority, status, content };
    if (isEditing) {
      updateNote(noteId, noteData);
    } else {
      addNote(noteData);
    }
    navigate("/dashboard");
  };

  const priorities = [
    { label: "Alta", value: "high", color: "red" },
    { label: "Média", value: "medium", color: "yellow" },
    { label: "Baixa", value: "low", color: "green" },
  ];

  const statuses = ["Feito", "Em Progresso", "Parado", "Cancelado"];

  return (
    <div className="note-editor-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1 className="dashboard-logo">
          <img src={Icone} alt="logo" />
          My_Note
        </h1>
      </header>

      {/* Editor de nota */}
      <div className="note-editor-wrapper">
        <div className="note-editor-card">
          {/* Título da nota */}
          <input
            id="note-title"
            type="text"
            placeholder="Nome da Nota"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="note-input"
          />

          {/* Prioridade e Status */}
          <div className="note-options">
            <div className="priority-section">
              <span>Prioridade:</span>
              {priorities.map((p) => (
                <button
                  key={p.value}
                  className={`priority-dot ${p.color} ${priority === p.value ? "active" : ""}`}
                  onClick={() => setPriority(p.value)}
                  aria-label={`Definir prioridade ${p.label}`}
                />
              ))}
            </div>

            <div className="status-section">
              <span>Status:</span>
              {statuses.map((st) => (
                <button
                  key={st}
                  className={`status-btn ${status === st ? "active" : ""}`}
                  onClick={() => setStatus(st)}
                  aria-label={`Definir status ${st}`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Conteúdo da nota */}
          <textarea
            id="note-content"
            placeholder="Escreva sua nota"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="note-textarea"
          />

          {/* Footer */}
          <div className="note-footer">
            <span className="last-edit">última edição {lastEdit}</span>
            <div className="footer-buttons">
              <button
                onClick={() => navigate("/dashboard")}
                className="secondary-btn small-btn"
              >
                Voltar
              </button>
              <button
                onClick={handleSave}
                className="primary-btn small-btn"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
