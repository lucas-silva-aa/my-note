import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import Icone from '../images/icone.svg';
import { supabase } from "../supabaseClient";
import { useNotes } from "../context/NotesContext";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { fetchNotes } = useNotes();

  async function handleLogin(e) {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
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
        <div className="logo">
          <img src={Icone} alt="logo" />
        </div>
        <h1 className="brand-title">My_Note</h1>
        <p className="brand-sub">Suas notas em um só lugar</p>
      </header>

      {/* card central */}
      <main className="login-wrapper">
        <div className="card">
          <h2 className="card-title">Login</h2>
          <p className="card-sub">Bem Vindo! Vamos anotar!</p>

          <form className="form" onSubmit={handleLogin}>
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

            <button type="submit" className="primary-btn">
              Entrar
            </button>
          </form>

          <Link to="/register" className="secondary-btn">
            Criar Conta
          </Link>
        </div>

        <p className="terms">
          Ao efetuar login, você concorda com nossos Termos, Política de Privacidade
          e Política de Cookies.
        </p>
      </main>
    </div>
  );
}
