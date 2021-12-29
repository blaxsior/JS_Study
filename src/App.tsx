import { useEffect, useState } from 'react';
import './App.css';
import CGrid from './components/CGrid';
import useHttp from './hooks/use-http';
import CharacterInfo from './interface/character-info';

const url = "https://api.genshin.dev/characters";

function App() {
  const [characters, setCharacters] = useState<CharacterInfo[]>([]);
  const { fetchFunc } = useHttp();
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    const asyncAction = async () => {
      setIsWaiting(true);
      try {
        const characterNames = await fetchFunc(url) as string[];
        const fetchedCharacters = await fetchFunc(characterNames.map(ch => `${url}/${ch}`)) as any[];
        console.log(fetchedCharacters);
        setCharacters(fetchedCharacters);
      }
      catch (e) {
        console.log(e);
      }
      setIsWaiting(false);
    };

    (async () => { await asyncAction() })();
  }, [fetchFunc]);

  return (
    <div className="App">
      <header className="App-header">
        {isWaiting &&
          <div>Please wait a moment ...</div>
        }
        {!isWaiting &&
          <CGrid characters={characters}/>
        }
      </header>
    </div>
  );
}

export default App;
