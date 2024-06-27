import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import TasksPage from './pages/Tasks';
import UserPage from './pages/User';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} index />

      <Route path="/user">
        <Route path="" element={<UserPage />} index />
        <Route path=":userId" element={<UserPage />} />
      </Route>

      <Route path="/task" element={<TasksPage />} />
    </Routes>
  );
}

export default App;
