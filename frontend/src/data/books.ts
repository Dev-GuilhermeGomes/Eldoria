// Auto-generated book data integrating Eldoria chapters with images and actual content
// Generated from outputs/*.docx files and images/ folder

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
    _id: 'eldoria_15',
    title: 'Capítulo 15: Os Aprendizes Despertam',
    author: 'Eldoria',
    synopsis: 'Capítulo 15 da saga Eldoria. Principal: Os Aprendizes Despertam, um Despertar.',
    coverImage: '/capitulo15.png',
    characters: [{
      _id: 'eldoria_os_aprendizes_despertam',
      name: 'Os Aprendizes Despertam',
      description: 'O momento em que os aprendizes descobrem seu verdadeiro poder.',
      history: 'Personagem central do capítulo 15 de Eldoria.',
      powers: ["Ascens\u00e3o M\u00e1gica", "Realiza\u00e7\u00e3o de Potencial"],
      class: 'Despertar'
    }],
    views: 7500,
    rating: 4.2,
    publishedDate: '2024-06-01',
    pages: 70,
    genres: ['Fantasia Épica', 'Ação', 'Aventura'],
    excerpt: 'Capítulo 15 Os Aprendizes Despertam — ✦ — I. O Fogo que não Arde O treino com Hugo durava há três horas quando Natiles finalmente parou de tentar. Não desistiu. Parou. Era diferente — e Hugo foi o primeiro a perceber a distinção. O campo de treino que o Aether disponibilizara era uma plataform...'
  },
  {
    _id: 'eldoria_16',
    title: 'Capítulo 16: A Fuga do Aether',
    author: 'Eldoria',
    synopsis: 'Capítulo 16 da saga Eldoria. Principal: O Fugitivo, um Perseguido.',
    coverImage: '/capitulo16.png',
    characters: [{
      _id: 'eldoria_o_fugitivo',
      name: 'O Fugitivo',
      description: 'Aquele que deve fugir do Aether antes que seja demasiado tarde.',
      history: 'Personagem central do capítulo 16 de Eldoria.',
      powers: ["Fuga R\u00e1pida", "Enganar Inimigos"],
      class: 'Perseguido'
    }],
    views: 7000,
    rating: 4.1,
    publishedDate: '2024-06-01',
    pages: 72,
    genres: ['Fantasia Épica', 'Ação', 'Aventura'],
    excerpt: 'Capítulo 16 A Fuga do Aether — ✦ — I. Antes de Amanhecer Reuniram-se na câmara central quando o Aether estava no seu escurecimento mais fundo. Nove pessoas. Três aprendizes que tinham dormido menos de três horas. Bagagem mínima — o que cabia numa mochila, o que não podia ser deixado para trás....'
  },
  {
    _id: 'eldoria_17',
    title: 'Capítulo 17: A Prisao de Cinzas',
    author: 'Eldoria',
    synopsis: 'Capítulo 17 da saga Eldoria. Principal: A Prisão de Cinzas, um Ambiente Hostil.',
    coverImage: '/capitulo17.png',
    characters: [{
      _id: 'eldoria_a_prisão_de_cinzas',
      name: 'A Prisão de Cinzas',
      description: 'A barreira cinzenta que separa o mundo dos vivos da corrupção.',
      history: 'Personagem central do capítulo 17 de Eldoria.',
      powers: ["Aprisionamento", "Corrup\u00e7\u00e3o do Nether"],
      class: 'Ambiente Hostil'
    }],
    views: 6500,
    rating: 4.1,
    publishedDate: '2024-06-01',
    pages: 74,
    genres: ['Fantasia Épica', 'Ação', 'Aventura'],
    excerpt: 'Capítulo 17 A Prisão de Cinzas — ✦ — I. A Fronteira O Nether não tem porta. Tem bocas. O grupo avançou pela ravina que a Sophie identificara três dias antes — uma fratura no chão de Eldoria onde o calor subia em espirais negras e o ar cheirava a enxofre e a algo mais antigo que qualquer nome q...'
  },
  {
    _id: 'eldoria_18',
    title: 'Capítulo 18: A Fissura',
    author: 'Eldoria',
    synopsis: 'Capítulo 18 da saga Eldoria. Principal: A Fissura Dimensional, um Catástrofe.',
    coverImage: '/capitulo18.png',
    characters: [{
      _id: 'eldoria_a_fissura_dimensional',
      name: 'A Fissura Dimensional',
      description: 'A rotura que ameaça unir os dois mundos.',
      history: 'Personagem central do capítulo 18 de Eldoria.',
      powers: ["Divis\u00e3o de Mundos", "Abertura do Abismo"],
      class: 'Catástrofe'
    }],
    views: 6000,
    rating: 4.0,
    publishedDate: '2024-06-01',
    pages: 76,
    genres: ['Fantasia Épica', 'Ação', 'Aventura'],
    excerpt: 'Capítulo 18 A Fissura — ✦ — I. Depois do Silêncio O Nether saiu da mesma forma que entrou — sem porta, sem movimento, sem ausência que se pudesse nomear. Estava e depois não estava. E o silêncio que ficou era diferente do silêncio de antes: mais pesado, mais consciente, como o silêncio de uma sa...'
  },
  {
    _id: 'eldoria_19',
    title: 'Capítulo 19: A Verdade',
    author: 'Eldoria',
    synopsis: 'Capítulo 19 da saga Eldoria. Principal: A Verdade Revelada, um Revelação.',
    coverImage: '/capitulo19.png',
    characters: [{
      _id: 'eldoria_a_verdade_revelada',
      name: 'A Verdade Revelada',
      description: 'O momento em que todos os segredos são finalmente expostos.',
      history: 'Personagem central do capítulo 19 de Eldoria.',
      powers: ["Exposi\u00e7\u00e3o da Realidade", "Verdade Absoluta"],
      class: 'Revelação'
    }],
    views: 5500,
    rating: 4.0,
    publishedDate: '2024-06-01',
    pages: 78,
    genres: ['Fantasia Épica', 'Ação', 'Aventura'],
    excerpt: 'Capítulo 19 O Castelo no Centro — ✦ — I. O Caminho O Nether não tinha horizonte. Tinha profundidade — uma sensação constante de que o espaço continuava para lá do que os olhos conseguiam alcançar, não em largura mas em peso. Como andar dentro de algo que ainda estava a ser construído à volta de...'
  },
  {
    _id: 'eldoria_20',
    title: 'Capítulo 20: O Que Nao Foi Dito',
    author: 'Eldoria',
    synopsis: 'Capítulo 20 da saga Eldoria. Principal: O Após a Verdade, um Reflexão.',
    coverImage: '/capitulo20.png',
    characters: [{
      _id: 'eldoria_o_após_a_verdade',
      name: 'O Após a Verdade',
      description: 'Aquilo que persiste após a verdade ter sido dita.',
      history: 'Personagem central do capítulo 20 de Eldoria.',
      powers: ["Compreens\u00e3o Profunda", "Ressignifica\u00e7\u00e3o"],
      class: 'Reflexão'
    }],
    views: 5000,
    rating: 3.9,
    publishedDate: '2024-06-01',
    pages: 80,
    genres: ['Fantasia Épica', 'Ação', 'Aventura'],
    excerpt: 'Capítulo 20 O Que Não Foi Dito — ✦ — I. Antes — O Que o Hugo Viu O Hugo nunca contou a ninguém. Não porque não soubesse como. Porque havia coisas que, se fossem ditas em voz alta, se tornavam reais de uma forma que o silêncio não permitia. E ele tinha precisado que aquilo não fosse completament...'
  },
  {
    _id: 'eldoria_21',
    title: 'Capítulo 21: Eldoria',
    author: 'Eldoria',
    synopsis: 'Capítulo 21 da saga Eldoria. Principal: Eldoria Completa, um Conclusão Épica.',
    coverImage: '/capitulo21.png',
    characters: [{
      _id: 'eldoria_eldoria_completa',
      name: 'Eldoria Completa',
      description: 'O destino final de Eldoria e seus heróis.',
      history: 'Personagem central do capítulo 21 de Eldoria.',
      powers: ["Renascimento do Mundo", "Novo Come\u00e7o"],
      class: 'Conclusão Épica'
    }],
    views: 4500,
    rating: 3.9,
    publishedDate: '2024-06-01',
    pages: 82,
    genres: ['Fantasia Épica', 'Ação', 'Aventura'],
    excerpt: 'Capítulo 21 Por Eldoria — ✦ — I. O Que Não Chegou O Belos tentou. Não com hesitação — com tudo o que tinha. O fragmento, a morte usada como escudo, a presença que tinha feito o chão cristalizar em Cinzavar e que tinha recusado ceder no reino dos mortos. Tentou empurrar a maré de bichos de volta...'
  },
  {
    _id: 'eldoria_10',
    title: 'Capítulo 10: O Peso Solidao',
    author: 'Eldoria',
    synopsis: 'Capítulo 10 da saga Eldoria. Principal: A Solidão do Peso, um Conceito Abstrato.',
    coverImage: '/capitulo10.png',
    characters: [{
      _id: 'eldoria_a_solidão_do_peso',
      name: 'A Solidão do Peso',
      description: 'O peso da responsabilidade que cada um carrega.',
      history: 'Personagem central do capítulo 10 de Eldoria.',
      powers: ["Press\u00e3o Emocional", "Teste de Vontade"],
      class: 'Conceito Abstrato'
    }],
    views: 10000,
    rating: 4.4,
    publishedDate: '2024-06-01',
    pages: 60,
    genres: ['Fantasia Épica', 'Ação', 'Aventura'],
    excerpt: 'ELDORIA Capítulo 10 O Peso da Solidão Hugo [ A floresta não deu ao Hugo um inimigo. Não deu uma visão. Não deu uma revelação dramática. Deu-lhe o único teste que sabia que nunca passara. Silêncio. E a obrigação de ficar dentro dele. ] — — — PARTE I — SÓ — — — Hugo ficou sozinho. Não de repe...'
  },
  {
    _id: 'eldoria_11',
    title: 'Capítulo 11: A Memoria do Deus',
    author: 'Eldoria',
    synopsis: 'Capítulo 11 da saga Eldoria. Principal: O Deus Esquecido, um Entidade Divina.',
    coverImage: '/capitulo11.png',
    characters: [{
      _id: 'eldoria_o_deus_esquecido',
      name: 'O Deus Esquecido',
      description: 'Uma divindade cujos segredos moldam o destino de Eldoria.',
      history: 'Personagem central do capítulo 11 de Eldoria.',
      powers: ["Mem\u00f3ria Eterna", "Conhecimento Ancestral"],
      class: 'Entidade Divina'
    }],
    views: 9500,
    rating: 4.4,
    publishedDate: '2024-06-01',
    pages: 62,
    genres: ['Fantasia Épica', 'Ação', 'Aventura'],
    excerpt: 'ELDORIA Capítulo 11 A Memória do Deus O grupo [ Entraram separados. Saíram diferentes. E no centro da floresta mais antiga de Eldoria — onde a corrupção do Nether já chegara às raízes e onde a memória do ser supremo ainda pulsava — encontraram-se outra vez. Sete pessoas que já não eram exactamen...'
  },
  {
    _id: 'eldoria_12',
    title: 'Capítulo 12: A Saida',
    author: 'Eldoria',
    synopsis: 'Capítulo 12 da saga Eldoria. Principal: O Guardião da Saída, um Protetor.',
    coverImage: '/capitulo12.png',
    characters: [{
      _id: 'eldoria_o_guardião_da_saída',
      name: 'O Guardião da Saída',
      description: 'Aquele que vigia o caminho de volta.',
      history: 'Personagem central do capítulo 12 de Eldoria.',
      powers: ["Guardiania Interdimensional", "Controle do Portal"],
      class: 'Protetor'
    }],
    views: 9000,
    rating: 4.3,
    publishedDate: '2024-06-01',
    pages: 64,
    genres: ['Fantasia Épica', 'Ação', 'Aventura'],
    excerpt: 'ELDORIA Capítulo 12 A Saída Fim da Parte 2 [ Havia três crianças sentadas na borda do poço. O grupo que enfrentara o Nether, que entrara no reino dos mortos, que sobrevivera a tudo o que Eldoria lhes pudera lançar — ficou em silêncio diante de três elfos pequenos que os olhavam com a expressão d...'
  },
  {
    _id: 'eldoria_13',
    title: 'Capítulo 13: A Porta do Aether',
    author: 'Eldoria',
    synopsis: 'Capítulo 13 da saga Eldoria. Principal: O Portal Mágico, um Estrutura Mágica.',
    coverImage: '/capitulo13.png',
    characters: [{
      _id: 'eldoria_o_portal_mágico',
      name: 'O Portal Mágico',
      description: 'A porta entre mundos que leva ao Aether.',
      history: 'Personagem central do capítulo 13 de Eldoria.',
      powers: ["Transporte Dimensional", "Abertura do Aether"],
      class: 'Estrutura Mágica'
    }],
    views: 8500,
    rating: 4.2,
    publishedDate: '2024-06-01',
    pages: 66,
    genres: ['Fantasia Épica', 'Ação', 'Aventura'],
    excerpt: 'PARTE 3 Os Deuses e os Mortos — — — ELDORIA Capítulo 13 A Porta do Aether O grupo [ Há lugares que parecem a resposta a tudo. Que têm a luz certa, o ar certo, a ausência exacta de tudo o que cansa. O Aether era esse lugar. E era exactamente por isso que devia ter levantado mais suspeitas do q...'
  },
  {
    _id: 'eldoria_14',
    title: 'Capítulo 14: Os Herdeiros',
    author: 'Eldoria',
    synopsis: 'Capítulo 14 da saga Eldoria. Principal: Os Herdeiros, um Coletivo Mágico.',
    coverImage: '/capitulo14.png',
    characters: [{
      _id: 'eldoria_os_herdeiros',
      name: 'Os Herdeiros',
      description: 'Aqueles que herdam o poder dos antigos.',
      history: 'Personagem central do capítulo 14 de Eldoria.',
      powers: ["Heran\u00e7a Divina", "Poder Geracional"],
      class: 'Coletivo Mágico'
    }],
    views: 8000,
    rating: 4.2,
    publishedDate: '2024-06-01',
    pages: 68,
    genres: ['Fantasia Épica', 'Ação', 'Aventura'],
    excerpt: 'ELDORIA Capítulo 14 Os Herdeiros Belos, Aria e Luna [ O poder que se herda não é o mesmo que o poder que se ganha. Um tem raízes mais fundas. O outro tem forma mais própria. O melhor é quando os dois se encontram — quando o herdado ganha a forma do que és e não a forma de quem foi antes. ] — —...'
  },
  {
    _id: 'eldoria_01',
    title: 'Capítulo 1: ',
    author: 'Eldoria',
    synopsis: 'Capítulo 1 da saga Eldoria. Principal: Belos, um Paladino.',
    coverImage: '/capitulo1.png',
    characters: [{
      _id: 'eldoria_belos',
      name: 'Belos',
      description: 'Um Paladino marcado pelo destino, guerreiro de luz contra as trevas do Nether.',
      history: 'Personagem central do capítulo 1 de Eldoria.',
      powers: ["L\u00e2mina Sagrada", "Escudo de Luz", "Resist\u00eancia Divina"],
      class: 'Paladino', imagePath: "/Belos.png"
    }],
    views: 14500,
    rating: 4.9,
    publishedDate: '2024-06-01',
    pages: 42,
    genres: ['Fantasia Épica', 'Ação', 'Aventura'],
    excerpt: 'ELDORIA Capítulo 1 O Marcado Belos, o Paladin PARTE I — A ESTALAGEM DA CHUVA — — — A chuva não pede licença. Cai sobre Eldoria como sempre caiu — sem intenção, sem destino, sem a consciência de que o mundo que molha está a partir-se por baixo dos seus pés. A chuva não sabe o que é uma fratura...'
  },
  {
    _id: 'eldoria_02',
    title: 'Capítulo 2: A Chama e o Aco',
    author: 'Eldoria',
    synopsis: 'Capítulo 2 da saga Eldoria. Principal: Hugo, um Mago do Fogo.',
    coverImage: '/capitulo2.png',
    characters: [{
      _id: 'eldoria_hugo',
      name: 'Hugo',
      description: 'Um mago da Chama com poderes inatos de fogo.',
      history: 'Personagem central do capítulo 2 de Eldoria.',
      powers: ["Fogo Ardente", "Combust\u00e3o M\u00e1gica"],
      class: 'Mago do Fogo'
    }],
    views: 14000,
    rating: 4.8,
    publishedDate: '2024-06-01',
    pages: 44,
    genres: ['Fantasia Épica', 'Ação', 'Aventura'],
    excerpt: 'ELDORIA Capítulo 2 A Chama e o Aço Hugo e John, os Magos [ Enquanto o grupo do Belos seguia para norte após o confronto com o Barius, a dois dias de distância dois outros viajantes combatiam os seus próprios problemas — sem saber ainda que os seus caminhos estavam prestes a cruzar-se. ] — — —...'
  },
  {
    _id: 'eldoria_03',
    title: 'Capítulo 3: O Ladrao e o Abismo',
    author: 'Eldoria',
    synopsis: 'Capítulo 3 da saga Eldoria. Principal: Kael, um Guerreiro Sombrio.',
    coverImage: '/capitulo3.png',
    characters: [{
      _id: 'eldoria_kael',
      name: 'Kael',
      description: 'Um guerreiro das sombras, treinado como ladrão mas com honra.',
      history: 'Personagem central do capítulo 3 de Eldoria.',
      powers: ["L\u00e2mina Silenciosa", "Movimento nas Sombras"],
      class: 'Guerreiro Sombrio'
    }],
    views: 13500,
    rating: 4.8,
    publishedDate: '2024-06-01',
    pages: 46,
    genres: ['Fantasia Épica', 'Ação', 'Aventura'],
    excerpt: 'ELDORIA Capítulo 3 O Ladrão e o Abismo Kael, o Guerreiro [ Enquanto o Belos seguia para norte com o nome da Sophie nos lábios, e enquanto Hugo e John convergiam na direção do grupo, havia um terceiro caminho a decorrer em paralelo — mais sombrio, mais solitário, e prestes a mudar tudo o que qual...'
  },
  {
    _id: 'eldoria_04',
    title: 'Capítulo 4: A Vida',
    author: 'Eldoria',
    synopsis: 'Capítulo 4 da saga Eldoria. Principal: Sophie, um Vidente.',
    coverImage: '/capitulo4.png',
    characters: [{
      _id: 'eldoria_sophie',
      name: 'Sophie',
      description: 'Uma prisioneira em Valdrim, símbolo da esperança.',
      history: 'Personagem central do capítulo 4 de Eldoria.',
      powers: ["Resist\u00eancia Espiritual", "Conex\u00e3o com Magia Antiga"],
      class: 'Vidente', imagePath: "/Sophie.png"
    }],
    views: 13000,
    rating: 4.7,
    publishedDate: '2024-06-01',
    pages: 48,
    genres: ['Fantasia Épica', 'Ação', 'Aventura'],
    excerpt: 'PRÓLOGO — O RESGATE — — — [ Antes da batalha. Antes da noite que ninguém esqueceria. Havia uma fortaleza — e dentro dela, uma pessoa que o Belos prometera a si próprio que iria buscar. ] — — — A fortaleza dos Paladins de Valdrim tinha quatro torres, duzentos e trinta e dois guardas em rotação, e...'
  },
  {
    _id: 'eldoria_05',
    title: 'Capítulo 5: A Lua final da 1 parte',
    author: 'Eldoria',
    synopsis: 'Capítulo 5 da saga Eldoria. Principal: Kira, um Mistério.',
    coverImage: '/capitulo5.png',
    characters: [{
      _id: 'eldoria_kira',
      name: 'Kira',
      description: 'Uma rapariga envolta em mistério e silêncio.',
      history: 'Personagem central do capítulo 5 de Eldoria.',
      powers: ["Sil\u00eancio M\u00e1gico", "Percep\u00e7\u00e3o Oculta"],
      class: 'Mistério'
    }],
    views: 12500,
    rating: 4.7,
    publishedDate: '2024-06-01',
    pages: 50,
    genres: ['Fantasia Épica', 'Ação', 'Aventura'],
    excerpt: 'ELDORIA Capítulo 5 A Lua Kira — Fim da Parte 1 — [ Havia seis pessoas naquele grupo. Cada uma carregava algo visível — cristal no chão, corrupção no torso, magia nas mãos, luz da lua, o peso de um nome numa pedra. Só uma carregava algo que não se via. E por isso, durante muito tempo, ninguém pe...'
  },
  {
    _id: 'eldoria_06',
    title: 'Capítulo 6: O Portal parte 2',
    author: 'Eldoria',
    synopsis: 'Capítulo 6 da saga Eldoria. Principal: O Grupo Reunido, um Coletivo.',
    coverImage: '/capitulo6.png',
    characters: [{
      _id: 'eldoria_o_grupo_reunido',
      name: 'O Grupo Reunido',
      description: 'Sete pessoas convergindo num propósito comum na Floresta do Crepúsculo.',
      history: 'Personagem central do capítulo 6 de Eldoria.',
      powers: ["Peso do Grupo", "Converg\u00eancia de Destinos"],
      class: 'Coletivo'
    }],
    views: 12000,
    rating: 4.6,
    publishedDate: '2024-06-01',
    pages: 52,
    genres: ['Fantasia Épica', 'Ação', 'Aventura'],
    excerpt: 'PARTE 2 A Floresta do Crepúsculo — — — ELDORIA Capítulo 6 O Portal O grupo [ A Parte 1 terminou com uma ameaça que aprendera a sua forma. A Parte 2 começa com o grupo a perceber que a forma deles também precisa de mudar. ] — — — PARTE I — A FLORESTA QUE ESPERA — — — Havia florestas em Eld...'
  },
  {
    _id: 'eldoria_07',
    title: 'Capítulo 7: O Espelho e a Sombra',
    author: 'Eldoria',
    synopsis: 'Capítulo 7 da saga Eldoria. Principal: O Espelho da Floresta, um Força da Natureza.',
    coverImage: '/capitulo7.png',
    characters: [{
      _id: 'eldoria_o_espelho_da_floresta',
      name: 'O Espelho da Floresta',
      description: 'A manifestação que reflete os medos mais profundos.',
      history: 'Personagem central do capítulo 7 de Eldoria.',
      powers: ["Reflex\u00e3o de Verdade", "Exposi\u00e7\u00e3o Espiritual"],
      class: 'Força da Natureza'
    }],
    views: 11500,
    rating: 4.6,
    publishedDate: '2024-06-01',
    pages: 54,
    genres: ['Fantasia Épica', 'Ação', 'Aventura'],
    excerpt: 'ELDORIA Capítulo 7 O Espelho e a Sombra Belos e Kira [ A floresta não testa o que és. Testa o que evitas ser. E às vezes a única forma de passar é ter alguém ao lado que vê o que tu não consegues ver de ti próprio. ] — — — PARTE I — O PAR MAIS IMPROVÁVEL — — — A Kira contou os passos entre a...'
  },
  {
    _id: 'eldoria_08',
    title: 'Capítulo 8: A Luz e a Cicatriz',
    author: 'Eldoria',
    synopsis: 'Capítulo 8 da saga Eldoria. Principal: A Cicatriz de Luz, um Cicatriz Mágica.',
    coverImage: '/capitulo8.png',
    characters: [{
      _id: 'eldoria_a_cicatriz_de_luz',
      name: 'A Cicatriz de Luz',
      description: 'Marca deixada pela batalha anterior que guia o caminho.',
      history: 'Personagem central do capítulo 8 de Eldoria.',
      powers: ["Cicatriza\u00e7\u00e3o Divina", "Luz Purificadora"],
      class: 'Cicatriz Mágica'
    }],
    views: 11000,
    rating: 4.5,
    publishedDate: '2024-06-01',
    pages: 56,
    genres: ['Fantasia Épica', 'Ação', 'Aventura'],
    excerpt: 'ELDORIA Capítulo 8 A Luz e a Cicatriz Aria e Sophie [ Há duas formas de sobreviver a uma explosão. Fingir que não aconteceu. Ou carregar o que ficou e decidir o que fazer com isso. Estas duas escolheram a segunda forma — cada uma à sua maneira. ] — — — PARTE I — O PAR DAS SOBREVIVENTES — — —...'
  },
  {
    _id: 'eldoria_09',
    title: 'Capítulo 9: O Fogo e a Teoria 2',
    author: 'Eldoria',
    synopsis: 'Capítulo 9 da saga Eldoria. Principal: Natiles, um Aprendiz de Magia.',
    coverImage: '/capitulo9.png',
    characters: [{
      _id: 'eldoria_natiles',
      name: 'Natiles',
      description: 'Uma jovem com potencial mágico extraordinário buscando seu lugar.',
      history: 'Personagem central do capítulo 9 de Eldoria.',
      powers: ["Aprendizado M\u00e1gico", "Potencial Latente"],
      class: 'Aprendiz de Magia'
    }],
    views: 10500,
    rating: 4.5,
    publishedDate: '2024-06-01',
    pages: 58,
    genres: ['Fantasia Épica', 'Ação', 'Aventura'],
    excerpt: 'ELDORIA Capítulo 9 O Fogo e a Teoria Kael e John [ Há conhecimento que ilumina. E há conhecimento que queima. Os dois chegaram à mesma verdade por caminhos opostos — um pela experiência que destrói, outro pela herança que pesa. A floresta ia mostrar-lhes o que essa verdade custa quando não há ni...'
  }
];

export const getBookById = (id?: string) => books.find((book) => book._id === id);

export const getMoreFromAuthor = (book: Book) =>
  books.filter((candidate) => candidate.author === book.author && candidate._id !== book._id);
