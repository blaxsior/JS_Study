import React, { useContext } from 'react';
import './App.css';
import AuthContext from './store/auth.context';
import Home from './Components/Home/Home';
import MainHeader from './Components/MainHeader/MainHeader';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <MainHeader
        isLoggedIn={authCtx.isLoggedIn}
        onLogout={authCtx.onLogout}/>
      <Home/>
    </div>
  );
}

export default App;
