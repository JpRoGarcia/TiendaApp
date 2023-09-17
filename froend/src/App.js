import React from 'react';
import logo from './logo.svg';
import './App.css';
import Component from './components/MiComponente';
import myApp from './components/app';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <myApp/>
      </header>
    </div>
  );
}

export default App;