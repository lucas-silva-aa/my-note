import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import "../App.css";
import Icone from "../images/icone.svg";
import { ReactComponent as FilterIcon } from "../images/filter.svg";
import { supabase } from "../supabaseClient";

export default function Dashboard() {
  const navigate = useNavigate();
  const { notes, deleteNote } = useNotes();
  const [selectedPriority, setSelectedPriority] = useState(null); // default Todos
  const [showFilter, setShowFilter] = useState(false);
  const [userInitial, setUserInitial] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const name = user.user_metadata?.name || user.email || "U";
        setUserInitial(name.charAt(0).toUpperCase());
      }
    }
    fetchUser();
  }, []);

  const priorities = [
    { label: "Todos", value: null, color: "gray" },
    { label: "Alta", value: "high", color: "red" },
    { label: "Média", value: "medium", color: "orange" },
    { label: "Baixa", value: "low", color: "green" },
  ];

  const filteredNotes =
    selectedPriority && selectedPriority !== null
      ? notes.filter((note) => note.priority === selectedPriority)
      : notes;

  const handleSelectPriority = (value) => {
    setSelectedPriority(selectedPriority === value ? null : value);
    setShowFilter(false); // fecha dropdown
  };

  const handleDelete = (noteId) => {
    const confirmDelete = window.confirm("Deseja realmente deletar esta nota?");
    if (confirmDelete) {
      deleteNote(noteId);
    }
  };

  return (
    <div className="dashboard-page">
      {/* Header */}
      <header className="dashboard-header">
        <h1 className="dashboard-logo">
          <img src={Icone} alt="logo" />
          My_Note
        </h1>
        <div className="dashboard-actions">
<div className="avatar">{userInitial}</div>
        </div>
      </header>

      {/* Filtro */}
      <div className="filter-container">
        <button
          className="filter-btn"
          onClick={() => setShowFilter(!showFilter)}
        >
          <FilterIcon />
        </button>

        {showFilter && (
          <div className="filter-dropdown">
            {priorities.map((p) => (
              <div
                key={p.label}
                className={`filter-option ${
                  selectedPriority === p.value ? "active" : ""
                }`}
                onClick={() => handleSelectPriority(p.value)}
              >
                <span
                  className="priority-dot-dashboard"
                  style={{ backgroundColor: p.color }}
                ></span>
                {p.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <main className="dashboard-content">
        {/* Criar nova nota */}
        <div className="note-card new-note" onClick={() => navigate("/note")}>
          <div className="new-note-icon">
            <img src={Icone} alt="logo" />
          </div>
          <button className="primary-btn">Criar Nova Nota</button>
        </div>

        {/* Notas filtradas */}
{filteredNotes.map((note) => {
  let priorityColor = "gray";
  if (note.priority === "high") priorityColor = "red";
  else if (note.priority === "medium") priorityColor = "orange";
  else if (note.priority === "low") priorityColor = "green";

  return (
    <div
      key={note.id}
      className="note-card"
      onClick={() => navigate(`/note/${note.id}`)}
      style={{ cursor: "pointer", position: "relative" }}
    >
      <h2 className="note-title">{note.title || "Título Teste"}</h2>
      <p className="note-desc">{note.content || "Descrição Teste"}</p>
      <p className="note-status">
        <span
          className="priority-dot-dashboard"
          style={{ backgroundColor: priorityColor, marginRight: "0.5rem" }}
        ></span>
        {note.status || "Feito"}
      </p>
      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation(); // evita abrir a edição
          const confirmDelete = window.confirm("Deseja realmente deletar esta nota?");
          if (confirmDelete) deleteNote(note.id);
        }}
      >
        Deletar
      </button>
    </div>
  );
})}

      </main>
    </div>
  );
}
