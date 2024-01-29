import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Modal, Box } from "@mui/material";
import logo from "../assests/logo.svg";
import ServiceForm from "./ServiceForm";
import EditService from "./Editservice";

const Navbar = ({ username, onLogout }) => {
  const [isLoggedIn, setLogin] = useState(localStorage.getItem("token"));
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const goToHome = () => {
    window.location.href = "/";
  };

  return (
    <>
      <AppBar
        position="static"
        style={{ backgroundColor: "#202121", marginBottom: "5%" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            style={{
              textDecoration: "none",
              color: "white",
              cursor: "pointer",
            }}
            onClick={goToHome}
          >
            <img src={logo} width={40} alt="Logo" />
          </Typography>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            {isLoggedIn && (
              <Button
                color="inherit"
                onClick={handleOpen}
                sx={{ marginLeft: 1 }}
              >
                New Service
              </Button>
            )}
            {/* Add the PositionedMenu */}
            <PositionedMenu isLoggedIn={isLoggedIn} onLogout={onLogout} />
          </div>
        </Toolbar>
      </AppBar>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          sx: { backgroundColor: "white", marginTop: "5%" },
        }}
      >
        <Box style={{ marginTop: "10%" }}>
          <ServiceForm onPostService={handleClose} />
        </Box>
      </Modal>
    </>
  );
};

const PositionedMenu = ({ isLoggedIn, onLogout }) => {
  const [openService, setOpenService] = React.useState(false);
  const handleOpenService = () => setOpenService(true);
  const handleCloseService = () => setOpenService(false);
  const goToMessages = () => {
    window.location.href = "/messages";
  };
  const goToOrders = () => {
    window.location.href = "/orders";
  };

  const goToServices = () => {
    window.location.href = "/services";
  };

  const goToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <React.Fragment>
      <Modal
        open={openService}
        onClose={handleCloseService}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          sx: { backgroundColor: "white", marginTop: "5%" },
        }}
      >
        <Box style={{ marginTop: "20%" }}>
          {" "}
          <EditService />
        </Box>
      </Modal>

      {isLoggedIn && (
        <>
          <Button variant="text" onClick={goToServices} color="inherit">
            Services
          </Button>
          <Button onClick={goToOrders} color="inherit">
            Orders
          </Button>
          <Button variant="text" onClick={handleOpenService} color="inherit">
            My Service
          </Button>

          <Button variant="text" onClick={goToMessages} color="inherit">
            Messages
          </Button>
        </>
      )}

      {isLoggedIn ? (
        <Button variant="contained" onClick={onLogout} color="error">
          Logout
        </Button>
      ) : (
        <Button variant="contained" onClick={goToLogin} color="primary">
          Login
        </Button>
      )}
    </React.Fragment>
  );
};

export default Navbar;
