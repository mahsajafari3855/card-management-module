import "./App.css";
import CardListContainer from "./components/cardListContainer/CardListContainer";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Card Management System</h1>
        </header>
        <CardListContainer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
