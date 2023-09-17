import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import './App.css';
import { Seal } from './seal';
import { Setting } from './settings';

export const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Seal />} />
        <Route path="/sub" element={<Setting />} />
      </Routes>
    </HashRouter>
  );
};
