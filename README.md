# FalltoBook

Plataforma digital da saga literária original Eldoria, criada por Guilherme Gomes.

## Funcionalidades

- 21 capítulos navegáveis
- Leitura em desktop e mobile
- Tema claro e escuro
- Controles de tamanho e espaçamento do texto
- Personagens, capas e navegação por capítulos
- API Express preparada para MongoDB
- Deploy estático suportado no Cloudflare Pages

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Express
- MongoDB / Mongoose
- JWT

## Desenvolvimento

```bash
cd frontend
npm install
npm run dev
```

Em outro terminal:

```bash
cd backend
npm install
npm run dev
```

## Deploy gratuito

O frontend pode ser publicado no Cloudflare Pages com o diretório `frontend/dist`.

O backend pode ser publicado num serviço Node gratuito e a base de dados pode usar MongoDB Atlas com o plano gratuito.

Antes do deploy, configure `MONGODB_URI`, `JWT_SECRET`, `PORT` e `VITE_API_URL`.

## Autor

Guilherme Gomes
