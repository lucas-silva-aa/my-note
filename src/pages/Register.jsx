import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { supabase } from "../supabaseClient";
import { useNotes } from "../context/NotesContext";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { fetchNotes } = useNotes();

  async function handleRegister(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não conferem!");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } }
    });

    if (error) {
      alert("Erro: " + error.message);
    } else {
      await fetchNotes();

      navigate("/dashboard");
    }
  }

  return (
    <div className="page">
      {/* topo com logo / título */}
      <header className="brand">
        <div className="logo">📝</div>
        <h1 className="brand-title">My_Note</h1>
        <p className="brand-sub">Suas notas em um só lugar</p>
      </header>

      {/* card central */}
      <main className="login-wrapper">
        <div className="card">
          <h2 className="card-title">Cadastro</h2>
          <p className="card-sub">Cadastre-se para anotar</p>

          <form className="form" onSubmit={handleRegister}>
            <div className="form-group">
              <label className="label">Nome</label>
              <input
                className="input"
                type="text"
                placeholder="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="label">Email</label>
              <input
                className="input"
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="label">Senha</label>
              <input
                className="input"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="label">Confirmar Senha</label>
              <input
                className="input"
                type="password"
                placeholder="Digite sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="primary-btn">
              Cadastrar-se
            </button>
          </form>

          <Link to="/" className="secondary-btn">
            Já tem conta? Faça Login
          </Link>
        </div>

        <p className="terms">
          Ao efetuar seu cadastro, você concorda com nossos Termos, Política de
          Privacidade e Política de Cookies.
        </p>
      </main>
    </div>
  );
}
