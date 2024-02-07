import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Link as MuiLink,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Room as RoomIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Security,
  ThumbUp,
  AccessTime,
  AttachMoney,
  ChatBubble,
  VerifiedUser,
  Settings,
  People,
} from "@mui/icons-material";
import logo from "../assests/logo.svg";

const LandingPage = () => {
  return (
    <div>
      {/* Navbar */}
      {/* <AppBar
        position="static"
        style={{ backgroundColor: "#202121", marginBottom: "5%" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            style={{ textDecoration: "none", color: "white" }}
          >
            <img src={logo} width={40}></img>
          </Typography>
          <div style={{width:'100%',display:'flex',justifyContent:'flex-end',flexDirection:'row',alignItems:'flex-end'}}>
            <Button
              component={Link}
              to="/login"
              color="info"
              variant="contained" // Add this to make it look like a button
              sx={{ marginLeft: 1 }} // Adjust marginLeft to position the button
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              color="secondary"
              variant="contained"
              sx={{ marginLeft: 1 }} // Adjust marginLeft to position the button
            >
              Register
            </Button>
          </div>
        </Toolbar>
      </AppBar> */}

      {/* Cover Section */}
      <Container
        maxWidth="xl"
        style={{
          backgroundImage:
            'url("https://as1.ftcdn.net/v2/jpg/03/19/05/40/1000_F_319054056_dElukKMgLPudXiMHiNoxJcnooGopsO0L.jpg")',
          borderRadius: 20,
          height: 400,
        }}
      ></Container>
      <Typography
        variant="h3"
        align="center"
        style={{ paddingTop: "100px", color: "black" }}
      >
        Welcome to Your Company
      </Typography>
      {/* Advantages Section */}
      <Container maxWidth="md" style={{ marginTop: "50px" }}>
        <Typography variant="h4" gutterBottom>
          Advantages of Our Website
        </Typography>
        <Grid container spacing={3}>
          {/* Advantage 1 */}
          <Grid item xs={3}>
            <Card style={{ height: "100%" }}>
              <CardContent>
                <Security fontSize="large" color="primary" />
                <Typography variant="h6">Secure Transactions</Typography>
                <Typography variant="body2" color="text.secondary">
                  securely handled using advanced encryption.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Advantage 2 */}
          <Grid item xs={3}>
            <Card style={{ height: "100%" }}>
              <CardContent>
                <ThumbUp fontSize="large" color="primary" />
                <Typography variant="h6">Customer Satisfaction</Typography>
                <Typography variant="body2" color="text.secondary">
                  Our top priority is satisfaction of our customers.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Repeat for Advantages 3-8 */}
          {/* Advantage 3 */}
          <Grid item xs={3}>
            <Card style={{ height: "100%" }}>
              <CardContent>
                <AccessTime fontSize="large" color="primary" />
                <Typography variant="h6">Quick Turnaround</Typography>
                <Typography variant="body2" color="text.secondary">
                  Experience swift and efficient service delivery.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Advantage 4 */}
          <Grid item xs={3}>
            <Card style={{ height: "100%" }}>
              <CardContent>
                <AttachMoney fontSize="large" color="primary" />
                <Typography variant="h6">Affordable Pricing</Typography>
                <Typography variant="body2" color="text.secondary">
                  Quality services at budget-friendly prices.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Add more advantages as needed */}
        </Grid>
      </Container>

      {/* Marketing Content Section */}
      <Container maxWidth="md" style={{ marginTop: "50px" }}>
        <Typography variant="h4" gutterBottom>
          Why Choose Us?
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Card center>
              <CardMedia
                component="img"
                height="140"
                image="https://as2.ftcdn.net/v2/jpg/01/05/29/87/1000_F_105298748_M0SEFmjLSmNXe4FSNQRmkLWhOkx84jFG.jpg"
                alt="Marketing Content"
              />
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
            you'll have the best team dedicated to serving your Consulting & IT requirements.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Quotes Section */}
      <Container maxWidth="md" style={{ marginTop: "50px" }}>
        <Typography variant="h4" gutterBottom>
          What Our Clients Say
        </Typography>
        <Grid container spacing={3}>
          {/* Quote 1 */}
          <Grid item xs={6}>
            <Typography variant="body1" style={{ fontStyle: "italic" }}>
              "Great service and highly skilled professionals. They exceeded our
              expectations!"
            </Typography>
          </Grid>
          {/* Quote 2 */}
          <Grid item xs={6}>
            <Typography variant="body1" style={{ fontStyle: "italic" }}>
              "Exceptional quality of work and prompt delivery. Would recommend
              to anyone in need of IT solutions."
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Service Sections */}
      <Container maxWidth="md" style={{ marginTop: "50px" }}>
        <Typography variant="h4" gutterBottom>
          Our Services
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="https://as1.ftcdn.net/v2/jpg/02/10/89/62/1000_F_210896295_JIvqsYr52eoofdF2WWC2K5WNVeBAXoCh.jpg"
                alt="Service 2"
              />
              <CardContent>
                <Typography variant="h6">IT Consulting</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="https://as2.ftcdn.net/v2/jpg/03/19/05/43/1000_F_319054373_x1pt6CmQa1UkAfFxmwg7yjZyD5znjnBX.jpg"
                alt="Service 3"
              />
              <CardContent>
                <Typography variant="h6">IT Development</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* About Us Section */}
      <Container maxWidth="md" style={{ marginTop: "50px" }}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1">
        we are 2 cmputer student that have the impsion to make a websit that can gather professional people to gave ther experinc in the it & consultant.
        </Typography>
      </Container>

      {/* Contact Us Section */}
      <Container maxWidth="md" style={{ marginTop: "50px" }}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1">
          <MuiLink
            href="mailto:info@yourcompany.com"
            color="inherit"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              marginBottom: "10px",
            }}
          >
            <EmailIcon style={{ marginRight: "5px" }} />
            GeneralMaintenance@gamil.com
          </MuiLink>
          <MuiLink
            href="tel:+1234567890"
            color="inherit"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <PhoneIcon style={{ marginRight: "5px" }} />
            +966530211268
          </MuiLink>
        </Typography>
      </Container>

    

      {/* Footer Section */}
      <Container
        maxWidth="xl"
        style={{
          marginTop: "50px",
          backgroundColor: "#f5f5f5",
          padding: "20px",
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          © 2024 Your Company. All rights reserved.
        </Typography>
        <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />
        <Typography variant="body2" color="text.secondary" align="center">
          <Link
            to="/about"
            style={{
              textDecoration: "none",
              color: "black",
              marginRight: "20px",
            }}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            style={{ textDecoration: "none", color: "black" }}
          >
            Contact Us
          </Link>
        </Typography>
      </Container>
    </div>
  );
};

export default LandingPage;
