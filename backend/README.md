# Backend ViperBook

Backend API para o website ViperBook.

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz com:

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/viperbook
JWT_SECRET=sua_chave_muito_segura_aqui
PORT=5000
NODE_ENV=development
```

## Desenvolvimento

```bash
npm run dev
```

## Build

```bash
npm run build
npm start
```

## API Endpoints

### Autenticação
- `POST /api/auth/register` - Registar novo utilizador
- `POST /api/auth/login` - Fazer login
- `POST /api/auth/refresh-token` - Renovar token

### Livros
- `GET /api/books` - Listar todos os livros
- `GET /api/books/:id` - Detalhes de um livro
- `POST /api/books` - Criar novo livro (admin)
- `PUT /api/books/:id` - Atualizar livro (admin)
- `DELETE /api/books/:id` - Deletar livro (admin)

### Personagens
- `GET /api/books/:bookId/characters` - Personagens de um livro
- `POST /api/books/:bookId/characters` - Adicionar personagem
- `PUT /api/characters/:id` - Atualizar personagem
- `DELETE /api/characters/:id` - Deletar personagem

### Utilizadores
- `GET /api/users/profile` - Perfil do utilizador
- `PUT /api/users/profile` - Atualizar perfil
- `POST /api/books/:id/like` - Marcar livro como favorito
- `DELETE /api/books/:id/like` - Remover de favoritos

### Contacto
- `POST /api/contact` - Enviar mensagem de contacto
