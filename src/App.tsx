import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CardListContainer from "./components/cardListContainer/CardListContainer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Card Management System</h1>
      </header>
      <CardListContainer />
    </div>
  );
}

export default App;
