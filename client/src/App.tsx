import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Navbar from "./components/navbar/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { useTypedSelector } from "./store/hooks";
import {
  ABOUT_PATH,
  HOME_PATH,
  RUN_QUIZ,
  SIGNIN_PATH,
  SIGNUP_PATH,
} from "./utils/config";
import { logout } from "./store/user.action";
import QuizForm from "./components/quiz/QuizForm";

function App() {
  const queryClient = new QueryClient();
  const userState = useTypedSelector((state) => state.users);
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <BrowserRouter>
          <Navbar isLoggedIn={userState.isLoggedIn} logout={logout} />
          <Routes>
            <Route path={HOME_PATH} element={<Home />} />
            <Route path={ABOUT_PATH} element={<About />} />
            <Route path={SIGNIN_PATH} element={<Signin />} />
            <Route path={SIGNUP_PATH} element={<Signup />} />
            <Route path={RUN_QUIZ} element={<QuizForm />} />
          </Routes>
        </BrowserRouter>
      </>
    </QueryClientProvider>
  );
}

export default App;
