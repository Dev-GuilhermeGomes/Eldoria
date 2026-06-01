# Desenvolvimento ViperBook - Guia Técnico

Este é um projeto full-stack de biblioteca de livros com tecnologia moderna.

## 🛠 Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB (Atlas)
- **Autenticação**: JWT

## 📦 Instalação Rápida

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Configure suas variáveis
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## 🗂 Estrutura de Pastas

### Backend (`/backend`)
```
src/
├── models/         # Esquemas MongoDB (User, Book, Contact)
├── routes/         # Definições de rotas
├── controllers/    # Lógica de negócio
├── middleware/     # Auth, error handling
└── utils/          # Funções auxiliares
```

### Frontend (`/frontend`)
```
src/
├── components/     # Navbar, Footer, BookCard
├── pages/          # Home, Books, BookDetail, About, Login, Register
├── services/       # API client (axios)
├── context/        # AuthContext para gerenciar estado
├── utils/          # Hooks customizados
└── styles/         # CSS global com Tailwind
```

## 🎯 Features Implementadas

✅ Autenticação JWT
✅ Navbar fixa à esquerda com navegação
✅ Footer com ícones sociais
✅ Página Home com CTA
✅ Catálogo de livros com busca e filtros
✅ Página de detalhes do livro
✅ Secção de personagens com detalhes expandíveis
✅ Sistema de likes/dislikes
✅ Formulário de contacto
✅ Tema dark/light
✅ Responsivo (mobile/tablet/desktop)
✅ Design minimalista com tons amarelos

## 📝 Variáveis de Ambiente

### Backend
```
MONGODB_URI=conexão-mongodb
JWT_SECRET=chave-secreta
PORT=5000
NODE_ENV=development
```

### Frontend
```
VITE_API_URL=http://localhost:5000
```

## 🚀 Deploy

### Opções Frontend
- **Vercel** (recomendado para React)
- **Netlify**
- **GitHub Pages**

### Opções Backend
- **Railway** (fácil e gratuito)
- **Heroku**
- **Fly.io**

### Database
- **MongoDB Atlas** (gratuito até 5GB)

## 🔗 Conexão Frontend-Backend

O frontend comunica com o backend via axios em `/frontend/src/services/api.ts`.

Exemplo:
```typescript
const response = await booksService.getAll();
```

Certificar-se que `VITE_API_URL` aponta para o backend correto.

## 🎨 Design

- **Cores**: Tons de amarelo suave (#f5d884) inspirados em lâmpadas de leitura
- **Tipografia**: Georgia/Garamond serif para leitura elegante
- **Dark Mode**: Suportado com Tailwind `dark:` utilities
- **Responsivo**: Mobile-first com breakpoints md (tablet) e lg (desktop)

## 🔐 Autenticação

- Senha hasheada com bcryptjs
- Token JWT válido por 24h
- Token armazenado em localStorage
- Interceptor automático em requisições

## 📊 Modelos de Dados

### User
- nome, email, password (hashed)
- arrays: favoriteBooks, likedBooks, dislikedBooks

### Book
- title, synopsis, author, coverImage
- characters array com detalhes
- views, likes, dislikes, rating
- genres, pages, publishedDate

### Character
- name, description, history
- powers array, class, imagePath
- iconic quote

### ContactMessage
- name, email, subject, message
- status (novo/respondido/em-progresso)

## 🧪 Testes

Para testar localmente:
1. Crie conta em MongoDB Atlas
2. Configure backend com .env
3. Rode `npm run dev` no backend
4. Rode `npm run dev` no frontend
5. Registre-se e explore

## 📚 Documentação Adicional

- [README.md](README.md) - Overview do projeto
- [/backend/README.md](backend/README.md) - API endpoints
- [/frontend/README.md](frontend/README.md) - Frontend setup

---

**Pronto para contribuir?**
- Crie uma branch para sua feature
- Siga o padrão de código existente
- Faça commit com mensagens descritivas
- Abra um Pull Request
