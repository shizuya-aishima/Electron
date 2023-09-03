import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Counter } from "./counter";
import Home from "./home";
import { Header } from "./header";
import { Seal } from "./seal";
import "./App.css"
import "tailwindcss/tailwind.css";

export const App = () => {

  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

