import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <>
        {/* <Home /> */}
        {/* <Signup /> */}
        <Signin />
      </>
    </QueryClientProvider>
  );
}

export default App;
