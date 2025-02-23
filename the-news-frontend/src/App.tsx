import { Route, Routes } from 'react-router-dom';
import { AdminDashboard, Login, UserDashboard, Attributions } from './pages/';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/atribuicoes" element={<Attributions />} />
      </Routes>
    </>
  );
}

export default App;
