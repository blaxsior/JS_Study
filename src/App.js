import './App.css';
import styles from './App.module.css';
import UserPanel from './components/UserPanel';

function App() {
  return (
    <div className={`App`}>
      <header>
        header
      </header>
      <aside className='leftSide'>
        Left Side
      </aside>
      <main>
        <UserPanel />
      </main>
      <aside className='rightSide'>
        Right Side
      </aside>
      <footer>
        footer
      </footer>
    </div>
  );
}

export default App;
