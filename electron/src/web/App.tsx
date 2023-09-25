import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import './App.css';
import { Seal } from './seal';
import { Setting } from './settings';

export const App = () => {
  return (
    <HashRouter>
      <div className="h-full bg-gray-400">
        <Routes>
          <Route path="/" element={<Seal />} />
          <Route path="/sub" element={<Setting />} />
        </Routes>
      </div>
    </HashRouter>
  );
};
