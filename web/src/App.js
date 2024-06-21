import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <div className="App">
          <p>Cleitin</p>
        </div>
      } />
    </Routes>
  );
}

export default App;
