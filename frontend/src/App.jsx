import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  return (
    <>
    <Header/>
      <main className="min-h-[79vh]">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
};

export default App;
