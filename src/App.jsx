import { Routes, Route, Navigate } from 'react-router-dom';
import Flow from './pages/Flow.jsx';
import Share from './pages/Share.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Flow />} />
      <Route path="/r/:sessionId" element={<Share />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
