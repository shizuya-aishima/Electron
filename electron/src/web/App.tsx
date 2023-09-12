import { BrowserRouter } from "react-router-dom";
import "tailwindcss/tailwind.css";
import "./App.css";
import { Seal } from "./seal";

export const App = () => {

  return (
    <BrowserRouter>
      <Seal />
    </BrowserRouter>
  );
};
