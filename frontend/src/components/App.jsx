// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import MainScreen from './MainScreen';
import ConnectionToGame from './ConnectionToGame';
import WaitToConnect from './WaitToConnect';
import AppPerson from './AppPerson';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />

        <Route path="/host/:roomId" element={<ConnectionToGame />} />
        <Route path="/guest/:roomId" element={<WaitToConnect />} />
        <Route path="/game/:roomId" element={<AppPerson />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
