import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabaseAdmin from "../supabaseAdmin";
import "../App.css";

export default function UsersScreen() {
    const navigate = useNavigate();

    // Estados da tela
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ email: "", password: "", name: "" });
    const [loading, setLoading] = useState(false);

    // Estados de edição
    const [editingUserId, setEditingUserId] = useState(null);
    const [editValues, setEditValues] = useState({ name: "", email: "", password: "" });

    // Busca todos os usuários do Supabase Admin
    async function fetchUsers() {
        setLoading(true);
        try {
            const { data: usersData, error } = await supabaseAdmin.auth.admin.listUsers();
            if (error) throw error;
            setUsers(usersData.users || []);
        } catch (err) {
            alert("Erro ao listar usuários: " + err.message);
        } finally {
            setLoading(false);
        }
    }

    // Cria um novo usuário
    async function handleCreateUser() {
        if (!newUser.email || !newUser.password || !newUser.name) {
            alert("Preencha todos os campos!");
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabaseAdmin.auth.admin.createUser({
                email: newUser.email,
                password: newUser.password,
                user_metadata: { name: newUser.name },
            });
            if (error) throw error;

            alert("Usuário criado com sucesso!");
            setNewUser({ email: "", password: "", name: "" });
            fetchUsers();
        } catch (err) {
            alert("Erro: " + err.message);
        } finally {
            setLoading(false);
        }
    }

    // Deleta um usuário
    async function handleDeleteUser(id) {
        if (!window.confirm("Deseja realmente excluir este usuário?")) return;

        setLoading(true);
        try {
            const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
            if (error) throw error;

            alert("Usuário deletado!");
            fetchUsers();
        } catch (err) {
            alert("Erro: " + err.message);
        } finally {
            setLoading(false);
        }
    }

    // Inicia edição de um usuário
    function startEdit(user) {
        setEditingUserId(user.id);
        setEditValues({
            name: user.user_metadata?.name || "",
            email: user.email,
            password: "",
        });
    }

    // Salva alterações de um usuário
    async function handleSaveEdit(id) {
        if (!editValues.name || !editValues.email) {
            alert("Nome e email são obrigatórios!");
            return;
        }

        setLoading(true);
        try {
            const updates = { user_metadata: { name: editValues.name } };
            if (editValues.password) updates.password = editValues.password;
            if (editValues.email !== users.find(u => u.id === id).email) updates.email = editValues.email;

            const { error } = await supabaseAdmin.auth.admin.updateUserById(id, updates);
            if (error) throw error;

            alert("Usuário atualizado!");
            setEditingUserId(null);
            setEditValues({ name: "", email: "", password: "" });
            fetchUsers();
        } catch (err) {
            alert("Erro: " + err.message);
        } finally {
            setLoading(false);
        }
    }

    // Busca usuários ao montar componente
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="users-page">
            {loading && <div className="overlay">Carregando...</div>}

            {/* Header */}
            <header className="dashboard-header clean-header">
                <h1 className="dashboard-logo">👥 Gerenciar Usuários</h1>
            </header>

            {/* Botão de voltar */}
            <div className="back-container">
                <button className="back-btn" onClick={() => navigate("/dashboard")}>
                    ← Voltar
                </button>
            </div>

            <main className="users-content">
                {/* Card de criação de usuário */}
                <div className="card create-card">
                    <h2>Criar Usuário</h2>
                    <div className="form-grid">
                        <input
                            className="input"
                            type="text"
                            placeholder="Nome"
                            value={newUser.name}
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        />
                        <input
                            className="input"
                            type="email"
                            placeholder="Email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />
                        <input
                            className="input"
                            type="password"
                            placeholder="Senha"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        />
                        <button
                            className="primary-btn"
                            onClick={handleCreateUser}
                            disabled={loading}
                        >
                            Criar Usuário
                        </button>
                    </div>
                </div>

                {/* Lista de usuários */}
                <div className="card users-list">
                    <h2>Lista de Usuários</h2>
                    {users.length === 0 ? (
                        <p style={{ textAlign: "center", color: "#666" }}>Nenhum usuário encontrado.</p>
                    ) : (
                        <div className="user-list-container">
                            {users.map((u) => (
                                <div key={u.id} className="user-item">
                                    {editingUserId === u.id ? (
                                        // Modo edição
                                        <div className="user-edit">
                                            <input
                                                className="input"
                                                type="text"
                                                value={editValues.name}
                                                onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                                                placeholder="Nome"
                                            />
                                            <input
                                                className="input"
                                                type="email"
                                                value={editValues.email}
                                                onChange={(e) => setEditValues({ ...editValues, email: e.target.value })}
                                                placeholder="Email"
                                            />
                                            <input
                                                className="input"
                                                type="password"
                                                value={editValues.password}
                                                onChange={(e) => setEditValues({ ...editValues, password: e.target.value })}
                                                placeholder="Nova senha (opcional)"
                                            />
                                            <div className="user-actions">
                                                <button
                                                    className="primary-btn small-btn"
                                                    onClick={() => handleSaveEdit(u.id)}
                                                >
                                                    💾 Salvar
                                                </button>
                                                <button
                                                    className="secondary-btn small-btn"
                                                    onClick={() => setEditingUserId(null)}
                                                >
                                                    ✖ Cancelar
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        // Modo exibição
                                        <div className="user-display">
                                            <div>
                                                <p className="user-name">{u.user_metadata?.name || "Sem nome"}</p>
                                                <p className="user-email">{u.email}</p>
                                            </div>
                                            <div className="user-actions">
                                                <button
                                                    className="primary-btn small-btn"
                                                    onClick={() => startEdit(u)}
                                                >
                                                    ✏️ Editar
                                                </button>
                                                <button
                                                    className="delete-btn small-btn"
                                                    onClick={() => handleDeleteUser(u.id)}
                                                >
                                                    🗑 Excluir
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
