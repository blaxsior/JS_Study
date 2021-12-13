import './App.css';
import Lock from './components/MyLock/Lock';

function App() {
  const password = [7,3,9,4,3];
  return (
    <div className="App">
      <Lock
      minNum={0}
      maxNum={9}
      password={password}
      />
    </div>
  );
}

export default App;
