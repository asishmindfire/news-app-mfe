import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Button,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import FeedIcon from "@mui/icons-material/Feed";
import LoginDialog from "../LoginDialog/LoginDialog";
import classes from "./Navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUser } from "../../store/slices/UserSlice";

const Navbar = () => {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const user = useSelector((state) => state.user.user);
  console.log(`nmc`, user);
  const dispatch = useDispatch();
  const handleLoginSubmit = (username, password) => {
    console.log(username, password);
    setOpenLoginDialog(false);
  };

  const handleLoginClose = () => {
    setOpenLoginDialog(false);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    dispatch(addUser( JSON.parse(user) ));
  },[]);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        className={classes.appbar}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <FeedIcon className={classes.logo} />
            <Link to="/" className={classes["brand-name"]}>
              <Typography variant="h6" noWrap className={classes.brand}>
                NEWS FOR YOU
              </Typography>
            </Link>
            <Box sx={{ flexGrow: 0 }}>
              {user?.email ? (
                <>
                  {/* <Tooltip title="Open profile"> */}
                    <IconButton sx={{ p: 0 }}>
                      <Avatar> {user?.name.substring(0, 1)} </Avatar>
                    </IconButton>
                  {/* </Tooltip> */}
                </>
              ) : (
                <Button
                  onClick={() => {
                    setOpenLoginDialog(true);
                  }}
                  className={classes["login-btn"]}
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <LoginDialog
        open={openLoginDialog}
        handleSubmit={handleLoginSubmit}
        handleClose={handleLoginClose}
      />
    </>
  );
};

export default Navbar;
