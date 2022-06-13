import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Navbar from "./components/navbar/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import {
  ABOUT_PATH,
  HOME_PATH,
  SIGNIN_PATH,
  SIGNUP_PATH,
} from "./utils/config";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path={HOME_PATH} element={<Home />} />
            <Route path={ABOUT_PATH} element={<About />} />
            <Route path={SIGNIN_PATH} element={<Signin />} />
            <Route path={SIGNUP_PATH} element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </>
    </QueryClientProvider>
  );
}

export default App;
