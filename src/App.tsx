import React from 'react';
import logo from './logo.svg';
import './App.css';
import CardList from './components/cardList/CardList';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Card Management System</h1>
      </header>
      <CardList />
    </div>
  );
}

export default App;
