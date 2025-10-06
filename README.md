
# 📝 My Note — Sistema de Gerenciamento de Notas Pessoais (SGCPD)

Aplicação web desenvolvida em **React.js** (Create React App) integrada ao **Supabase**, permitindo o gerenciamento completo de notas pessoais com autenticação, categorização por prioridade e interface responsiva.  

O projeto foi desenvolvido como parte do **Projeto Final — Desenvolvimento Front-End**.

---

## 🚀 Funcionalidades Principais

| Categoria          | Funcionalidade                                | Status |
|-------------------|-----------------------------------------------|--------|
| 👤 Usuários        | Login e cadastro via Supabase Auth            | ✅     |
| 📄 Notas           | Criar, visualizar, editar e excluir notas (CRUD completo) | ✅ |
| 🏷️ Organização     | Filtragem por prioridade                      | ✅     |
| 🔐 Segurança       | Confirmação antes de deletar notas           | ✅     |
| 💾 Persistência    | Integração total com Supabase Database       | ✅     |
| 📱 Responsividade  | Layout adaptável para desktop e mobile       | ✅     |

---

## 🧠 Tecnologias Utilizadas

- **React.js (Create React App)** — Front-end SPA  
- **Supabase** — Autenticação e banco de dados PostgreSQL  
- **JavaScript (ES6+)** — Lógica e manipulação de estado  
- **React Context API** — Compartilhamento global de estado  
- **CSS3 / Flexbox / Media Queries** — Layout e design responsivo  

---

## 🏗️ Estrutura do Projeto

```
my-note/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── context/
│   │   └── NotesContext.jsx        # Contexto global das notas
│   ├── images/                     # Recursos visuais e ícones
│   ├── pages/
│   │   ├── Dashboard.jsx           # Painel principal com listagem de notas
│   │   ├── Login.jsx               # Tela de login (Supabase Auth)
│   │   ├── NoteEditor.jsx          # Criação e edição de notas
│   │   ├── Register.jsx            # Cadastro de novo usuário
│   │   └── UsersScreen.jsx         # Listagem/gestão de usuários (opcional)
│   ├── App.js                      # Estrutura principal e rotas
│   ├── App.css                     # Estilos globais
│   ├── index.js                    # Ponto de entrada da aplicação
│   ├── index.css                   # Estilos base
│   ├── supabaseClient.js           # Conexão com Supabase
│   ├── supabaseAdmin.js            # Operações administrativas
│   ├── setupTests.js               # Configuração de testes
│   ├── reportWebVitals.js          # Métricas de performance
│   └── logo.svg
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ Instalação e Execução

### 1️⃣ Pré-requisitos
- Node.js (v16 ou superior)  
- Conta no Supabase  

### 2️⃣ Clonar o repositório
```bash
git clone https://github.com/lucas-silva-aa/my-note.git
cd my-note
```

### 3️⃣ Instalar dependências
```bash
npm install
```

### 4️⃣ Criar o arquivo `.env`
```env
REACT_APP_SUPABASE_URL=https://<seu-projeto>.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOi...
```

### 5️⃣ Rodar a aplicação
```bash
npm start
```

Acesse em: [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Configuração do Supabase

### 🔧 Tabela `notes`
Crie a tabela de notas com o SQL abaixo:

```sql
CREATE TABLE notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  title text NOT NULL,
  content text,
  priority text CHECK (priority IN ('Alta', 'Média', 'Baixa')),
  created_at timestamptz DEFAULT now()
);
```

### 🔐 Autenticação
Ative o **Supabase Auth** com método de e-mail/senha.  
Os usuários poderão se cadastrar diretamente pela tela **Register**.

---

## 💻 Scripts Disponíveis

| Comando        | Descrição                                    |
|----------------|---------------------------------------------|
| `npm start`    | Executa o projeto em modo de desenvolvimento |
| `npm run build`| Gera a build de produção                     |
| `npm test`     | Executa os testes (caso configurados)       |

---

## 🧪 Testes Sugeridos
- Validação de login e registro  
- Criação e deleção de notas  
- Filtro por prioridade  
- Renderização condicional de elementos  

---

## 📱 Design e Responsividade
- Layout **mobile-first**  
- Ícones e botões grandes e acessíveis  
- Estrutura fluida (Flexbox e media queries)  
- Testado em resoluções desktop e mobile  

💡 **Dica:** abra o DevTools (F12) e simule telas de `375x667` (iPhone) e `1366x768` (desktop).

---

## 🌐 Deploy
Recomenda-se o deploy em **Vercel** ou **Netlify**:
1. Crie uma conta e conecte seu GitHub  
2. Defina variáveis de ambiente (`REACT_APP_SUPABASE_URL`, `REACT_APP_SUPABASE_ANON_KEY`)  
3. Clique em **Deploy** e aguarde o build  
4. Sua aplicação estará online em minutos

---

## 👥 Autores

| Nome Completo                                    | Matrícula   | Função                   |
|-------------------------------------------------|------------|-------------------------|
| Júlio César Freitas Bueno de Moraes             | 2025200240 | Desenvolvedor Front-End  |
| Aylla Christinne Feitosa Rodrigues              | 2025200220 | Desenvolvedora Front-End |
| Fernanda Cordeiro dos Santos Ferreira          | 2025200226 | Desenvolvedora Front-End |
| Lucas Lacerda da Silva                           | 2025200246 | Desenvolvedor Front-End  |
| Bruno Ataídes Ferreira                           | 2025200221 | Desenvolvedor Front-End  |
| Paulo Henrique Santos Lima                       | 2025200256 | Desenvolvedor Front-End  |

---

## 🧾 Licença
Projeto desenvolvido para fins educacionais como requisito parcial da disciplina **Desenvolvimento Front-End — Prof. MSc. Reinaldo de Souza Júnior**.  
Uso livre para fins acadêmicos e de aprendizado.

---

## ✅ Checklist de Entrega
- CRUD de notas funcionando  
- Login e registro de usuário via Supabase  
- Filtro por prioridade  
- Confirmação de exclusão (window.confirm)  
- Interface responsiva  
- README completo  


💬 Feito com **React**, **Supabase** e muita dedicação.
