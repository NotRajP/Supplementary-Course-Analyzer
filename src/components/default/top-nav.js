import {
  Box,
  Button,
  Stack,
  useTheme,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  autocompleteClasses,
  IconButton,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Ginkgo from "../../img/ginkgo.jpg";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { auth } from "../../utils/firebase";
import { signOut } from "firebase/auth";

const menuOptions = [
  { label: "Home", path: "/" },
  { label: "Search", path: "/search" },
  { label: "Creators", path: "/Creators" },
  {
    label: "Student Enrollment Analyzer",
    path: "/StudentEnrollmentAnalyzer",
  },
  { label: "User List", path: "/users" },
  { label: "Manage User", path: "/ManageUser", id: "manage_user" },
];

export const TopNav = () => {
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const imageSize = isLargeScreen ? "210px" : "150px";

  const buttonStyle = {
    p: 1,
    textTransform: "none",
    "&:hover": {
      backgroundColor: "rgba(0, 100, 0, 0.7)",
    },
    fontWeight: "bold",
    boxShadow: "inset 0 -3px 0 rgba(0,0,0,0.2)",
    bgcolor: "#c7e5c1",
    color: "#0c3a2b",
    width: "100%",
    borderRadius: "4px",
  };
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {}
  };
  return (
    <Stack direction="column">
      <Box
        sx={{
          height: "100px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: {
            xs: 1,
            md: 6,
          },
        }}
      >
        <Box>
          <RouterLink to="https://www.csus.edu">
            <img
              src="https://www.csus.edu/NewCSUS2019-global-assets/_internal/images/logo-horizontal.png"
              alt="Sac State logo"
              style={{ maxWidth: imageSize, height: "auto" }}
            />
          </RouterLink>
        </Box>

        <List
          component="nav"
          aria-labelledby="primary-navigation"
          sx={{
            display: "flex",
            width: "auto",
            // marginRight: 20,
            height: "60px",
            justifyContent: "space-between",
            p: 2,
          }}
          role="menu"
        >
          <ListItem
            role="menuitem"
            disablePadding
            sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}
          >
            <RouterLink to="https://www.csus.edu/apply/index.html">
              <ListItemText
                id="apply_button"
                primary="APPLY"
                primaryTypographyProps={{
                  fontSize: "18px",
                  color: "black",
                  fontWeight: 550,
                }}
              />
            </RouterLink>
          </ListItem>
          <ListItem
            role="menuitem"
            disablePadding
            sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}
          >
            <RouterLink to="https://www.csus.edu/experience/index.html">
              <ListItemText
                id="experience_button"
                primary="EXPERIENCE"
                primaryTypographyProps={{
                  fontSize: "18px",
                  color: "black",
                  fontWeight: 550,
                }}
              />
            </RouterLink>
          </ListItem>
          <ListItem
            role="menuitem"
            disablePadding
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <RouterLink
              to="https://www.csus.edu/giving"
              sx={{ marginRight: 2 }}
            >
              <ListItemText
                id="give_button"
                primary="GIVE"
                primaryTypographyProps={{
                  fontSize: "18px",
                  color: "black",
                  fontWeight: 550,
                }}
              />
            </RouterLink>
          </ListItem>
          <ListItem>
            <IconButton id="menu_button" onClick={toggleMenu}>
              <MenuIcon
                fontSize="large"
                sx={{
                  stroke: (theme) => theme.palette.primary.main,
                  strokeWidth: 1,
                }}
              />
            </IconButton>
          </ListItem>
        </List>
        <Drawer
          PaperProps={{
            sx: {
              bgcolor: (theme) => theme.palette.primary.main,
              color: "white",
            },
          }}
          open={menuOpen}
          anchor="right"
          onClose={() => {
            setMenuOpen(false);
          }}
        >
          <Box
            sx={{
              width: "200px",
            }}
          >
            <List>
              {menuOptions?.map((option) => (
                <ListItem
                  disablePadding
                  component={RouterLink}
                  to={option.path}
                  key={option.path}
                  id={
                    option.id || option.label.toLowerCase().replace(/\s+/g, "_")
                  }
                  sx={{
                    color: "white",
                    "&:hover": {
                      color: (theme) => theme.palette.secondary.hornet,
                    },
                  }}
                >
                  <ListItemButton>
                    <ListItemText primary={option.label} />
                  </ListItemButton>
                </ListItem>
              ))}
              {user && (
                <ListItem disablePadding>
                  <ListItemButton
                    id="logout_button"
                    onClick={handleLogout}
                    sx={{
                      color: "white",
                      "&:hover": {
                        color: theme.palette.secondary.hornet,
                      },
                    }}
                  >
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              )}
            </List>
          </Box>
        </Drawer>
      </Box>

      <Box
        xs={12}
        sx={{
          backgroundImage: `url(${Ginkgo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "250px",
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            backgroundImage:
              "linear-gradient(to right, #043927, rgba(255, 255, 255, 0))",
            justifyContent: "left",
            alignItems: "center",
            textAlign: "center",
            pl: {
              xs: 5,
              md: 20,
            },
          }}
        >
          <Stack>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h4"
                align="left"
                fontFamily="BlinkMacSystemFont"
                style={{
                  color: "rgba(255, 255, 255, 1)",
                  textShadow: "black 2px 2px",
                }}
              >
                Supplementary <br /> Course Analyzer
              </Typography>
            </Link>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h5"
                align="left"
                fontFamily="BlinkMacSystemFont"
                style={{
                  color: "rgba(196, 181, 129, 1)",
                  textShadow: "black 2px 2px",
                }}
              >
                Sacramento State
              </Typography>
            </Link>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};
