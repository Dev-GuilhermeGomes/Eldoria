# ViperBook 📚

Um website minimalista de biblioteca de livros com design moderno e responsivo.

## 🎨 Features

- **Design Minimalista**: Tons de amarelo suave inspirados em lâmpadas de leitura
- **Dark/Light Mode**: Escolha o tema que prefere
- **Responsivo**: Compatível com mobile, tablet e desktop
- **Catálogo de Livros**: Lista com pesquisa e ordenação
- **Páginas Individuais**: Sinopse, autor, personagens e secção de leitura
- **Contacto**: Formulário estático e informações sobre o projeto

## 📦 Stack Tecnológico

### Frontend
- React 18 + TypeScript
- Tailwind CSS
- React Router para navegação

### Backend
- Backend incluído como base para futuras funcionalidades, mas o site atual funciona em modo estático

## 🚀 Como Começar

### Pré-requisitos
- Node.js (v16+)
- npm ou yarn

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/viperbook.git
cd viperbook
```

2. Configure o Frontend
```bash
cd frontend
npm install
npm start
```

O site estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
viperbook/
├── frontend/                 # React app
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── pages/           # Páginas principais
│   │   ├── services/        # Serviços API
│   │   ├── styles/          # Estilos globais
│   │   └── App.tsx
│   └── package.json
├── backend/                  # Base backend para futuro uso
├── .gitignore
└── README.md
```

## 🔐 Variáveis de Ambiente

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## 📝 Licença

MIT

## 👥 Autor

Seu Nome / Time
