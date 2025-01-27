import React, { useState } from 'react';
import './App.css';
//import { Button } from "@/components/ui/button"


const MarvelCharacters = () => {
  const [characters, setCharacters] = useState([]);

  const fetchCharacters = async () => {
    try {
      const response = await fetch('https://gateway.marvel.com/v1/public/characters?apikey=YOUR_API_KEY');
      const data = await response.json();
      setCharacters(data.data.results);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Personajes de Marvel</h1>
      <MarvelCharacters />
    </div>
  );
};

export default App;
