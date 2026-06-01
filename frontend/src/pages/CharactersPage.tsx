import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { CharacterCard } from '../components/CharacterCard';
import { ChapterCharacter } from '../data/eldoriaChapters';

// All unique characters from Eldoria
const eldoriaCharacters: ChapterCharacter[] = [
  {
    name: 'Belos',
    description: 'Um Paladino marcado pelo destino, guerreiro de luz contra as trevas do Nether. Carrega o peso da responsabilidade e a herança de poderes ancestrais.',
    class: 'Paladino',
    imagePath: '/Belos.png',
    role: 'Guardião da Alvorada',
    affinity: 'Luz Sagrada',
    age: '22',
    birthday: '14 Fev',
    height: '1.84m',
    abilities: ['Lâmina Sagrada', 'Barreira Solar', 'Juramento de Aço'],
    quote: 'A luz não apaga a sombra, mas mostra o caminho.',
  },
  {
    name: 'Hugo',
    description: 'Um mago de fogo com poder caótico e imenso. Isolado pelo seu poder destrutivo, mas essencial para o grupo.',
    class: 'Mago',
    imagePath: '/Hugo.png',
    role: 'Arcanista de Combate',
    affinity: 'Fogo Primordial',
    age: '21',
    birthday: '03 Jul',
    height: '1.79m',
    abilities: ['Coluna Ígnea', 'Pulso de Cinzas', 'Explosão Rubra'],
    quote: 'O fogo não pede desculpa por arder.',
  },
  {
    name: 'John',
    description: 'Um mago de gelo controlado e preciso. Representa o conhecimento herdado e a herança que pesa sobre os ombros.',
    class: 'Mago',
    imagePath: '/John.png',
    role: 'Mestre Rúnico',
    affinity: 'Gelo Antigo',
    age: '23',
    birthday: '09 Jan',
    height: '1.81m',
    abilities: ['Lança Boreal', 'Prisão Frígida', 'Muralha de Cristal'],
    quote: 'Disciplina é magia sem desperdício.',
  },
  {
    name: 'Kael',
    description: 'Um ladrão astuto com conexão profunda com o Nether. Oscila entre a sombra e a luz, procurando redenção.',
    class: 'Guerreiro',
    imagePath: '/Kael.png',
    role: 'Batedor Sombrio',
    affinity: 'Abismo Velado',
    age: '20',
    birthday: '27 Out',
    height: '1.77m',
    abilities: ['Passo Fantasma', 'Lâmina Veloz', 'Rasgo do Nether'],
    quote: 'A noite ensina o que a luz ignora.',
  },
  {
    name: 'Aria',
    description: 'A portadora da Luz da Lua. Sobrevivente que transformou sua cicatriz em força, servindo como guia espiritual para o grupo.',
    class: 'Lunar',
    imagePath: '/Aria.png',
    role: 'Oráculo Lunar',
    affinity: 'Luz da Lua',
    age: '22',
    birthday: '18 Mar',
    height: '1.70m',
    abilities: ['Crescente Prateado', 'Halo Sereno', 'Benção de Selene'],
    quote: 'A lua não grita, mas ninguém ignora a sua presença.',
  },
  {
    name: 'Sophie',
    description: 'A sobrevivente da explosão. Guerreira que carrega o peso de perdas irreversíveis mas permanece de pé.',
    class: 'Guerreira',
    imagePath: '/Sophie.png',
    role: 'Vanguarda de Ferro',
    affinity: 'Impacto Cinético',
    age: '24',
    birthday: '02 Mai',
    height: '1.75m',
    abilities: ['Investida Titan', 'Guarda Rúnica', 'Golpe de Ruptura'],
    quote: 'Cair não é derrota, ficar no chão é.',
  },
  {
    name: 'Kira',
    description: 'Uma contadora silenciosa que carrega segredos invisíveis. Vidente que enxerga o que os outros não conseguem ver em si próprios.',
    class: 'Seer',
    imagePath: '/Kira.png',
    role: 'Vidente do Véu',
    affinity: 'Presságio Arcano',
    age: '21',
    birthday: '31 Ago',
    height: '1.68m',
    abilities: ['Olho do Véu', 'Trama do Destino', 'Eco Profético'],
    quote: 'Ver o futuro é fácil. Difícil é aceitá-lo.',
  },
  {
    name: 'Luna',
    description: 'Uma aprendiz curiosa e muito sensível à magia. Apesar de pequena, já demonstra um controlo emocional raro para a idade.',
    class: 'Aprendiz',
    imagePath: '/Luna.png',
    role: 'Aprendiz da Luz',
    affinity: 'Luz Lunar',
    age: '10',
    birthday: '22 Nov',
    height: '1.37m',
    abilities: ['Faísca Lunar', 'Escudo Brando', 'Passo Leve'],
    quote: 'Um dia vou proteger toda a Eldoria.',
  },
  {
    name: 'Chisa',
    description: 'Aprendiz energética, gosta de testar feitiços novos e aprender com os mais velhos. A sua coragem aparece primeiro que o medo.',
    class: 'Aprendiz',
    imagePath: '/Chisa.png',
    role: 'Aprendiz Arcana',
    affinity: 'Vento Arcano',
    age: '9',
    birthday: '04 Abr',
    height: '1.33m',
    abilities: ['Sopro Arcano', 'Laço de Brisa', 'Pulso Claro'],
    quote: 'Se eu errar, tento outra vez mais forte.',
  },
  {
    name: 'Natiles',
    description: 'O mais calmo dos aprendizes. Observador e inteligente, prefere compreender primeiro e agir depois.',
    class: 'Aprendiz',
    imagePath: '/Natiles.png',
    role: 'Aprendiz Tático',
    affinity: 'Runas Antigas',
    age: '11',
    birthday: '13 Set',
    height: '1.41m',
    abilities: ['Selo Menor', 'Marca Rúnica', 'Orbe de Apoio'],
    quote: 'Pensar bem também é uma forma de lutar.',
  },
  {
    name: 'O Grupo',
    description: 'A forma coletiva dos heróis de Eldoria quando deixam de agir como indivíduos e avançam como um só.',
    class: 'Coletivo',
    imagePath: '/Grupo.png',
    role: 'Convergência de Heróis',
    affinity: 'Destino Compartilhado',
    age: '-',
    birthday: '-',
    height: '-',
    abilities: ['Coordenação Total', 'Vontade Unida', 'Frente Impossível de Quebrar'],
    quote: 'Separados sobrevivem. Juntos mudam o destino.',
  },
];

export const CharactersPage: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const classes = Array.from(new Set(eldoriaCharacters.map(c => c.class).filter((c): c is string => c !== undefined)));
  
  const filteredCharacters = selectedClass
    ? eldoriaCharacters.filter(c => c.class === selectedClass)
    : eldoriaCharacters;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/books"
            className="flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 mb-6 transition"
          >
            <FiArrowLeft size={20} />
            Voltar
          </Link>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-4">
              Personagens de Eldoria
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              Conheça os heróis que moldaram o destino de Eldoria
            </p>

            {/* Class Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button
                onClick={() => setSelectedClass(null)}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  selectedClass === null
                    ? 'bg-amber-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-amber-600 dark:hover:border-amber-400'
                }`}
              >
                Todos ({eldoriaCharacters.length})
              </button>
              {classes.map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`px-4 py-2 rounded-full font-semibold transition ${
                    selectedClass === cls
                      ? 'bg-amber-600 text-white'
                      : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-amber-600 dark:hover:border-amber-400'
                  }`}
                >
                  {cls} ({eldoriaCharacters.filter(c => c.class === cls).length})
                </button>
              ))}
            </div>

            <div className="h-1 w-12 bg-amber-600 mx-auto"></div>
          </div>
        </div>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {filteredCharacters.map((character) => (
            <CharacterCard key={character.name} character={character} />
          ))}
        </div>
      </div>
    </div>
  );
};
