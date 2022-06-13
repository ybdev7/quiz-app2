import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Navbar from "./components/navbar/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Signin />} />
            <Route path="/register" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </>
    </QueryClientProvider>
  );
}

export default App;
