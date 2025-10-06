import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NoteEditor from "./pages/NoteEditor";
import { NotesProvider } from "./context/NotesContext"; // 👈 importa o contexto
import UsersScreen from "./pages/UsersScreen";

export default function App() {
  return (
    <NotesProvider> {/* 👈 envolve tudo no provider */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<UsersScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/note/:id" element={<NoteEditor />} />
          <Route path="/note" element={<NoteEditor />} />
        </Routes>
      </Router>
    </NotesProvider>
  );
}
