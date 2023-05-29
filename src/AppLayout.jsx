import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Container from "./components/Container/Container";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Container />} />
        <Route path="*" exact element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppLayout;
