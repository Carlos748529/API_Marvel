import { useState } from 'react';
import './App.css';
import md5 from 'md5';

interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    available: number;
    items: Array<{ name: string }>;
  };
  series: {
    available: number;
    items: Array<{ name: string }>;
  };
}

const CharacterDetail = ({ character, onClose }: { character: Character; onClose: () => void }) => {
  console.log('CharacterDetail rendered with:', character);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg max-w-lg w-full p-6 relative">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <span className="text-2xl">×</span>
        </button>

        <div className="flex gap-4">
          <img 
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
            className="w-32 h-32 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">
              {character.name}
            </h2>
            <p className="text-gray-300">
              {character.description || "No hay descripción disponible para este personaje."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MarvelCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacters = async () => {
    setLoading(true);
    setError(null);
    
    const PUBLIC_KEY = '90fa5d814eb1df6a0a4e82347644b39c';
    const PRIVATE_KEY = 'c16251e7266d0f7281d475da99fd645c329fbc8d';
    const ts = new Date().getTime();
    const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);

    try {
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&limit=20`
      );
      
      if (!response.ok) {
        throw new Error('Error al cargar los personajes');
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      if (data.data && Array.isArray(data.data.results)) {
        setCharacters(data.data.results);
      } else {
        throw new Error('Formato de datos inválido');
      }
    } catch (error) {
      console.error('Error fetching characters:', error);
      setError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleCharacterClick = (character: Character) => {
    console.log('Character clicked:', character);
    setSelectedCharacter(character);
  };

  return (
    <div className="text-center">
      <button 
        onClick={fetchCharacters} 
        className="bg-red-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-red-700 transition-colors"
        disabled={loading}
      >
        {loading ? 'Cargando...' : 'Cargar Personajes'}
      </button>

      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-white mb-4">
          Cargando personajes...
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {characters.map((character) => (
          <div 
            key={character.id} 
            className="border border-gray-700 p-2 rounded-lg cursor-pointer hover:border-red-600 transition-colors"
            onClick={() => handleCharacterClick(character)}
          >
            <div className="relative pb-[100%]">
              <img 
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`} 
                alt={character.name} 
                className="absolute inset-0 w-full h-full object-cover rounded-md"
              />
            </div>
            <p className="font-bold mt-2 text-white">{character.name}</p>
          </div>
        ))}
      </div>

      {selectedCharacter && (
        <CharacterDetail 
          character={selectedCharacter} 
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </div>
  );
};

const App = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Personajes de Marvel</h1>
        <MarvelCharacters />
      </div>
    </div>
  );
};

export default App;