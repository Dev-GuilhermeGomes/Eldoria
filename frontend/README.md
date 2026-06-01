# Frontend ViperBook

Frontend moderno e responsivo para o website ViperBook desenvolvido em React + TypeScript + Tailwind CSS.

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

O site estará disponível em `http://localhost:3000`

## Build para Produção

```bash
npm run build
npm run preview
```

## Estrutura de Pastas

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ...
├── pages/              # Páginas principais
│   ├── Home.tsx
│   ├── Books.tsx
│   ├── BookDetail.tsx
│   └── About.tsx
├── data/               # Dados estáticos dos livros
│   └── books.ts
├── styles/             # Estilos globais
│   └── globals.css
├── App.tsx
└── main.tsx
```

## Features

- ✓ Design minimalista com tons de amarelo
- ✓ Dark/Light mode
- ✓ Responsivo (mobile, tablet, desktop)
- ✓ Carrossel de livros
- ✓ Busca e filtros
- ✓ Página de detalhes do livro
- ✓ Secção de leitura estática
- ✓ Formulário de contacto local
