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

  // Estado para prioridade selecionada no filtro
  const [selectedPriority, setSelectedPriority] = useState(null);

  // Estado de visibilidade do filtro e do menu do usuário
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);

  // Inicial do usuário para exibir no avatar
  const [userInitial, setUserInitial] = useState("");

  // Array de prioridades para filtro
  const priorities = [
    { label: "Todos", value: null, color: "gray" },
    { label: "Alta", value: "high", color: "red" },
    { label: "Média", value: "medium", color: "orange" },
    { label: "Baixa", value: "low", color: "green" },
  ];

  // Busca inicial do usuário logado no Supabase
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

  // Função utilitária para obter cor da prioridade
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "gray";
    }
  };

  // Notas filtradas de acordo com a prioridade selecionada
  const filteredNotes =
    selectedPriority !== null
      ? notes.filter((note) => note.priority === selectedPriority)
      : notes;

  // Alterna prioridade selecionada no filtro
  const handleSelectPriority = (value) => {
    setSelectedPriority(selectedPriority === value ? null : value);
    setIsFilterVisible(false);
  };

  // Logout do usuário
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
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
          {/* Avatar do usuário */}
          <div
            className="avatar"
            onClick={() => setIsUserMenuVisible(!isUserMenuVisible)}
            style={{ cursor: "pointer" }}
          >
            {userInitial}
          </div>

          {/* Menu do usuário */}
          {isUserMenuVisible && (
            <div className="filter-dropdown">
              <div
                className="filter-option"
                onClick={() => {
                  setIsUserMenuVisible(false);
                  navigate("/users");
                }}
              >
                Listar Usuários
              </div>
              <div className="filter-option" onClick={handleLogout}>
                Sair
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Filtro de prioridades */}
      <div className="filter-container">
        <button
          className="filter-btn"
          onClick={() => setIsFilterVisible(!isFilterVisible)}
        >
          <FilterIcon />
        </button>

        {isFilterVisible && (
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

      {/* Conteúdo principal */}
      <main className="dashboard-content">
        {/* Card para criar nova nota */}
        <div className="note-card new-note" onClick={() => navigate("/note")}>
          <div className="new-note-icon">
            <img src={Icone} alt="logo" />
          </div>
          <button className="primary-btn">Criar Nova Nota</button>
        </div>

        {/* Renderização das notas filtradas */}
        {filteredNotes.map((note) => (
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
                style={{
                  backgroundColor: getPriorityColor(note.priority),
                  marginRight: "0.5rem",
                }}
              ></span>
              {note.status || "Feito"}
            </p>

            {/* Botão de deletar nota */}
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                const confirmDelete = window.confirm(
                  "Deseja realmente deletar esta nota?"
                );
                if (confirmDelete) deleteNote(note.id);
              }}
            >
              Deletar
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}
