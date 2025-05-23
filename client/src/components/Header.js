// Header.js
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Typography, Toolbar, Box, Button, Tabs, Tab } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { authActions, setDarkmode } from "../store";
import { lightTheme, darkTheme } from "../utils/theme";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isDark = useSelector((state) => state.theme.isDarkmode);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const [tabValue, setTabValue] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("/blogs/add")) setTabValue(2);
    else if (location.pathname.includes("/myBlogs")) setTabValue(1);
    else if (location.pathname.includes("/blogs")) setTabValue(0);
    else setTabValue(false);
  }, [location.pathname]);

  const handleLoginClick = () => {
    navigate("/login", { state: { isSignupButtonPressed: false } });
  };

  const handleSignupClick = () => {
    navigate("/login", { state: { isSignupButtonPressed: true } });
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <AppBar position="sticky" sx={{ background: `${theme.bg}` }}>
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          BlogsApp
        </Typography>
        {isLoggedIn && (
          <Tabs
            textColor="inherit"
            value={tabValue}
            onChange={(e, val) => setTabValue(val)}
            sx={{ mx: "auto" }}
          >
            <Tab label="All Blogs" LinkComponent={Link} to="/blogs" />
            <Tab label="My Blogs" LinkComponent={Link} to="/myBlogs" />
            <Tab label="Add Blog" LinkComponent={Link} to="/blogs/add" />
          </Tabs>
        )}
        <Box display="flex" alignItems="center">
          {!isLoggedIn ? (
            <>
              <Button
                onClick={handleLoginClick}
                sx={{ margin: 1, fontWeight: "bold", color: "white", borderRadius: 10 }}
              >
                Login
              </Button>
              <Button
                onClick={handleSignupClick}
                sx={{ margin: 1, fontWeight: "bold", color: "white", borderRadius: 10 }}
              >
                SignUp
              </Button>
            </>
          ) : (
            <Button
              onClick={() => dispatch(authActions.logout())}
              LinkComponent={Link}
              to="/login"
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
              color="warning"
            >
              Logout
            </Button>
          )}
          <Box
            onClick={() => dispatch(setDarkmode(!isDark))}
            sx={{
              padding: "10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
