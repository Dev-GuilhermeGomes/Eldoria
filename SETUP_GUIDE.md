# 🚀 Guia de Início Rápido - ViperBook

## 📋 Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn
- Conta MongoDB Atlas (gratuita em mongodb.com)

## 🔧 Configuração Inicial

### 1. MongoDB Atlas Setup
1. Vá para [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Crie uma conta e um projeto gratuito
3. Crie um cluster
4. Adicione um utilizador de BD com password
5. Configure IP Whitelist (adicione 0.0.0.0/0 para desenvolvimento)
6. Cópia a connection string

### 2. Backend Setup

```bash
cd backend
npm install
```

Crie `.env`:
```env
MONGODB_URI=mongodb+srv://seu_usuario:sua_senha@seu-cluster.mongodb.net/viperbook
JWT_SECRET=sua_chave_super_secreta_aqui_2024
PORT=5000
NODE_ENV=development
```

Inicie o backend:
```bash
npm run dev
```

Backend estará em: http://localhost:5000

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Crie `.env`:
```env
VITE_API_URL=http://localhost:5000
```

Inicie o frontend:
```bash 
npm run dev
```

Frontend estará em: http://localhost:3000

## 📂 Estrutura do Projeto

```
viperbook/
├── backend/
│   ├── src/
│   │   ├── models/         # Schemas MongoDB
│   │   ├── routes/         # Rotas da API
│   │   ├── controllers/    # Lógica de negócio
│   │   ├── middleware/     # Autenticação
│   │   └── utils/
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Páginas
│   │   ├── services/       # API services
│   │   ├── context/        # Auth context
│   │   └── styles/
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🚀 Deploy

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Conecte ao Vercel e faça deployment
```

### Backend (Railway ou Heroku)
```bash
cd backend
npm run build
# Configure variáveis de ambiente no provider
# Faça deployment
```

## 📝 Dados de Teste

Para testar o sistema, adicione alguns livros à BD MongoDB:

```json
{
  "title": "O Senhor dos Anéis",
  "synopsis": "Uma épica aventura...",
  "author": "J.R.R. Tolkien",
  "coverImage": "https://...",
  "characters": [
    {
      "name": "Frodo",
      "description": "Um hobbit corajoso",
      "history": "Herdou o anel...",
      "powers": ["Determinação", "Coragem"],
      "class": "Herói",
      "iconicQuote": "One does not simply walk into Mordor"
    }
  ],
  "genres": ["Fantasia", "Aventura"],
  "pages": 1178,
  "publishedDate": "1954-07-29",
  "rating": 5
}
```

## 🎨 Personalização

### Cores
- Edite em `frontend/src/styles/globals.css`
- Altere `--color-yellow-primary` para outra cor

### Fontes
- Atualmente usa Georgia/Garamond
- Edite em `tailwind.config.ts`

### Tema
- Dark mode ativado por padrão no app
- Usa classe `dark` do Tailwind

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- Verifique connection string em `.env`
- Certifique whitelist IP em Atlas
- Confirme credenciais

### "CORS error"
- Backend deve ter CORS habilitado (está)
- Verifique `VITE_API_URL` está correto

### "Port already in use"
- Backend: altere PORT em `.env`
- Frontend: altere em `vite.config.ts`

## 📚 API Endpoints

**Autenticação:**
- `POST /api/auth/register` - Registar
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Perfil (requer token)

**Livros:**
- `GET /api/books` - Listar todos
- `GET /api/books/:id` - Detalhes
- `POST /api/books/:id/like` - Marcar like
- `POST /api/books/:id/dislike` - Marcar dislike

**Contacto:**
- `POST /api/contact` - Enviar mensagem

## 📞 Suporte

Para problemas, consulte os arquivos README em:
- `/backend/README.md`
- `/frontend/README.md`

---

**Versão:** 1.0.0  
**Stack:** React 18 + Node.js + MongoDB  
**License:** MIT
