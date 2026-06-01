#!/usr/bin/env python3
# Script para gerar o ficheiro books.ts com dados de Eldoria

content = '''// Auto-generated book data integrating Eldoria chapters with images and actual content
// Generated from outputs/*.docx files

export interface Character {
  _id: string;
  name: string;
  description: string;
  history: string;
  powers: string[];
  class: string;
  imagePath?: string;
  iconicQuote?: string;
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  synopsis: string;
  coverImage: string;
  characters: Character[];
  views: number;
  rating: number;
  publishedDate: string;
  pages: number;
  genres: string[];
  excerpt: string;
  content?: string;
}

export const books: Book[] = [
  {
    _id: 'eldoria_01',
    title: 'Capítulo 1: O Marcado',
    author: 'Eldoria',
    synopsis: 'Belos, um Paladino, enfrenta a chuva em Eldoria enquanto o mundo se parte por dentro. A noite em que tudo começa.',
    coverImage: '/capitulo1.png',
    characters: [{
      _id: 'eldoria_belos',
      name: 'Belos',
      description: 'Um Paladino marcado pelo destino, guerreiro de luz contra as trevas do Nether.',
      history: 'Treinado desde a infância para proteger Eldoria contra as forças corruptoras.',
      powers: ['Lâmina Sagrada', 'Escudo de Luz', 'Resistência Divina'],
      class: 'Paladino',
      iconicQuote: 'A chuva não sabe que o mundo está partido por dentro.'
    }],
    views: 15320,
    rating: 4.9,
    publishedDate: '2024-06-01',
    pages: 45,
    genres: ['Fantasia Épica', 'Ação', 'Aventura'],
    excerpt: 'A chuva não pede licença. Cai sobre Eldoria como sempre caiu — sem intenção, sem destino, sem a consciência de que o mundo que molha está a partir-se por baixo dos seus pés.'
  },
  {
    _id: 'eldoria_02',
    title: 'Capítulo 2: A Chama e o Aço',
    author: 'Eldoria',
    synopsis: 'Hugo e John, dois magos, enfrentam suas próprias batalhas enquanto os caminhos convergem.',
    coverImage: '/capitulo2.png',
    characters: [{
      _id: 'eldoria_hugo',
      name: 'Hugo',
      description: 'Um mago da Chama com poderes inatos de fogo.',
      history: 'Viaja buscando compreender as forças mágicas que o consomem.',
      powers: ['Fogo Ardente', 'Combustão Mágica'],
      class: 'Mago do Fogo',
      iconicQuote: 'O feitiço saiu errado, mas talvez fosse o certo.'
    }],
    views: 12840,
    rating: 4.8,
    publishedDate: '2024-06-01',
    pages: 47,
    genres: ['Fantasia', 'Magia', 'Aventura'],
    excerpt: 'O feitiço saiu errado. Não completamente — foi na direção certa, atingiu o alvo certo, causou o dano esperado.'
  },
  {
    _id: 'eldoria_03',
    title: 'Capítulo 3: O Ladrão e o Abismo',
    author: 'Eldoria',
    synopsis: 'Kael, o Guerreiro, enfrenta seu próprio caminho enquanto a corrupção avança.',
    coverImage: '/capitulo3.png',
    characters: [{
      _id: 'eldoria_kael',
      name: 'Kael',
      description: 'Um guerreiro das sombras, treinado como ladrão mas com honra.',
      history: 'Move-se pela períferia até descobrir seu verdadeiro lugar.',
      powers: ['Lâmina Silenciosa', 'Movimento nas Sombras'],
      class: 'Guerreiro Sombrio',
      iconicQuote: 'O abismo não me chama — eu já vivi nele.'
    }],
    views: 11200,
    rating: 4.7,
    publishedDate: '2024-06-01',
    pages: 48,
    genres: ['Ação', 'Drama', 'Aventura'],
    excerpt: 'Enquanto o Belos seguia para norte com o nome da Sophie nos lábios, havia um terceiro caminho a decorrer em paralelo.'
  },
  {
    _id: 'eldoria_04',
    title: 'Capítulo 4: A Vida',
    author: 'Eldoria',
    synopsis: 'Um prólogo de resgate e redenção. Sophie é encontrada e a libertação traz consigo responsabilidades.',
    coverImage: '/capitulo4.png',
    characters: [{
      _id: 'eldoria_sophie',
      name: 'Sophie',
      description: 'Uma prisioneira em Valdrim, símbolo da esperança.',
      history: 'Sua libertação desencadeia eventos que mudam o destino de Eldoria.',
      powers: ['Resistência Espiritual', 'Conexão com Magia Antiga'],
      class: 'Vidente',
      iconicQuote: 'Ser salvo é apenas o primeiro passo para salvar outros.'
    }],
    views: 10100,
    rating: 4.6,
    publishedDate: '2024-06-01',
    pages: 46,
    genres: ['Drama', 'Redenção', 'Fantasia'],
    excerpt: 'Antes da batalha. Antes da noite que ninguém esqueceria. Havia uma fortaleza — e dentro dela, uma pessoa que o Belos prometera a si próprio que iria buscar.'
  },
  {
    _id: 'eldoria_05',
    title: 'Capítulo 5: A Lua',
    author: 'Eldoria',
    synopsis: 'Kira traz consigo um secreto que ninguém vê. O grupo se forma.',
    coverImage: '/capitulo5.png',
    characters: [{
      _id: 'eldoria_kira',
      name: 'Kira',
      description: 'Uma rapariga envolta em mistério e silêncio.',
      history: 'Descobrirá que seu destino está ligado a forças muito maiores.',
      powers: ['Silêncio Mágico', 'Percepção Oculta'],
      class: 'Mistério',
      iconicQuote: 'Nem tudo o que se vê é a verdade.'
    }],
    views: 9850,
    rating: 4.7,
    publishedDate: '2024-06-01',
    pages: 42,
    genres: ['Mistério', 'Fantasia', 'Revelação'],
    excerpt: 'Havia seis pessoas naquele grupo. Cada uma carregava algo visível — cristal no chão, corrupção no torso, magia nas mãos.'
  },
  {
    _id: 'eldoria_06',
    title: 'Capítulo 6: O Portal',
    author: 'Eldoria',
    synopsis: 'A Floresta do Crepúsculo os aguarda. A Parte 2 começa com uma compreensão terrível.',
    coverImage: '/capitulo6.png',
    characters: [{
      _id: 'eldoria_group_p2',
      name: 'O Grupo Reunido',
      description: 'Sete pessoas convergindo num propósito comum.',
      history: 'Entram na Twilight Forest como indivíduos; devem sair como um.',
      powers: ['Peso do Grupo', 'Convergência de Destinos'],
      class: 'Coletivo',
      iconicQuote: 'A floresta que espera testa aquilo que evitas ser.'
    }],
    views: 9300,
    rating: 4.8,
    publishedDate: '2024-06-01',
    pages: 50,
    genres: ['Fantasia Épica', 'Transformação', 'Aventura'],
    excerpt: 'A Parte 1 terminou com uma ameaça que aprendera a sua forma. A Parte 2 começa com mudança necessária.'
  },
  {
    _id: 'eldoria_07',
    title: 'Capítulo 7: O Espelho e a Sombra',
    author: 'Eldoria',
    synopsis: 'Belos e Kira enfrentam seus reflexos mais profundos. A floresta testa o invisível.',
    coverImage: '/capitulo7.png',
    characters: [{
      _id: 'eldoria_reflection',
      name: 'O Espelho da Floresta',
      description: 'A manifestação que reflete os medos mais profundos.',
      history: 'Um teste de quem verdadeiramente és quando as máscaras caem.',
      powers: ['Reflexão de Verdade', 'Exposição Espiritual'],
      class: 'Força da Natureza',
      iconicQuote: 'Veres-te como realmente és é o teste mais difícil.'
    }],
    views: 8920,
    rating: 4.9,
    publishedDate: '2024-06-01',
    pages: 44,
    genres: ['Introspecção', 'Fantasia', 'Psicológico'],
    excerpt: 'A floresta não testa o que és. Testa o que evitas ser. E a única forma de passar é ter alguém que vê.'
  }
];

export const getBookById = (id?: string) => books.find((book) => book._id === id);

export const getMoreFromAuthor = (book: Book) =>
  books.filter((candidate) => candidate.author === book.author && candidate._id !== book._id);
'''

# Write to file
with open('./frontend/src/data/books.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ books.ts updated with Eldoria chapters!")
print("Total chapters: 7 (First 7 of 14)")
