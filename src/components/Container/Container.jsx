import React from "react";
import Sidebar from "category_sidebar/Sidebar";
import NewsLayout from "news_layout/NewsLayout";
import Box from "@mui/material/Box";

function Container() {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Sidebar />
      <NewsLayout />
    </Box>
  );
}

export default Container;
