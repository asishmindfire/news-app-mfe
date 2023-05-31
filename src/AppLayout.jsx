import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Container from "./components/Container/Container";
import NewsLayout from "news_layout/NewsLayout";
import Report from "reporting_mfe/ReportApp";
import { useNavigate } from "react-router-dom";
import WindowEventService from "./events/globalEvent";
import Box from "@mui/material/Box";
import Sidebar from "category_sidebar/Sidebar";

const AppLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    WindowEventService.subscribe("report-routing", (event) => {
      if (event.detail) {
        navigate(`/report`);
      }
    });

    WindowEventService.subscribe("news-routing", () => {
        if (window.location.pathname === '/report') {
          navigate(`/`);
        }
    });
  },[]);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          width: '100vw'
        }}
      >
        <Sidebar />
        <Routes>
          <Route path="/" exact element={<NewsLayout />} />
          <Route path="/report" exact element={<Report />} />
          <Route path="*" exact element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </>
  );
};

export default AppLayout;
