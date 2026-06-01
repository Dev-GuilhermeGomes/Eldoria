# ViperBook - Instruções do Projeto para Copilot

## 📚 Visão Geral

ViperBook é um website full-stack de biblioteca de livros minimalista com design elegante e responsivo.

## 🛠 Stack Tecnológico

- **Frontend**: React 18 + TypeScript + Tailwind CSS + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB (Atlas)
- **Autenticação**: JWT + bcryptjs

## 📂 Estrutura de Pastas

```
viperbook/
├── backend/          # API Node.js/Express
│   ├── src/
│   │   ├── models/   # Mongoose schemas
│   │   ├── routes/   # Rotas da API
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── utils/
│   └── package.json
├── frontend/         # React app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── styles/
│   └── package.json
└── README.md
```

## 🚀 Como Começar

1. **Backend**:
   ```bash
   cd backend
   npm install
   cp .env.example .env  # Configure MongoDB
   npm run dev
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📝 Regras de Desenvolvimento

- Componentes React funcionais com TypeScript
- Componentes tailwindcss sem CSS files separados
- Usar context API para estado global
- Rotas protegidas com autenticação
- Mensagens de erro user-friendly
- Responsivo por padrão

## 🎨 Design

- **Cores primárias**: Amarelo (#f5d884) e variações
- **Dark/Light mode**: Suportado
- **Tipografia**: Serif (Georgia) para leitura elegante
- **Navbar**: Fixa à esquerda
- **Footer**: Com ícones sociais

## 📡 API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `PUT /api/auth/profile`

### Books
- `GET /api/books` (com queries: genre, search, sort)
- `GET /api/books/:id`
- `POST /api/books/:id/like`
- `POST /api/books/:id/dislike`

### Contact
- `POST /api/contact`

## 🔐 Autenticação

- Token JWT em header: `Authorization: Bearer <token>`
- Token armazenado em localStorage
- 24h de validade

## 📊 Modelos

- **User**: name, email, password, favoriteBooks, likedBooks, dislikedBooks
- **Book**: title, author, synopsis, characters[], views, rating, etc
- **Character**: name, history, powers[], class, imagePath, iconicQuote
- **ContactMessage**: name, email, subject, message, status

## ✨ Features Implementadas

✅ Autenticação completa
✅ Catálogo de livros com busca e filtros
✅ Detalhes do livro com personagens
✅ Like/Dislike system
✅ Dark/Light mode
✅ Formulário de contacto
✅ Responsivo (mobile/tablet/desktop)
✅ Design minimalista com navbar à esquerda

## 🔧 Variáveis de Ambiente

### Backend (.env)
```
MONGODB_URI=mongodb+srv://seu_usuario:sua_senha@seu_cluster.mongodb.net/viperbook
JWT_SECRET=sua-chave-muito-secreta-aqui-2024
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## 📚 Documentação

- [README.md](README.md) - Overview do projeto
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Guia de início rápido
- [DEVELOPMENT.md](DEVELOPMENT.md) - Guia técnico detalhado
- [CHECKLIST.md](CHECKLIST.md) - Status de implementação

## 🚀 Deploy

- **Frontend**: Vercel ou Netlify
- **Backend**: Railway, Heroku ou similar
- **Database**: MongoDB Atlas (gratuito até 5GB)

---

**Versão**: 1.0.0  
**Última atualização**: 22 de Maio de 2024
