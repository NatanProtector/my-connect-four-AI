import "./App.css";
import ConnectFour from "./view/ConnectFour.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Natans Connect four AI</h1>
      </header>
      <main>
        <ConnectFour />
      </main>
    </div>
  );
}

export default App;
