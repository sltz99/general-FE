import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { postService } from "../api";
const ServiceForm = ({ onPostService }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); 
    console.log("called");// Retrieve the stored token
    const response = await postService(title, description, price, token);
    onPostService();
    console.log(response); // Handle the response appropriately
    window.location.reload()
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Post a Service
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            margin="normal"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Description"
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <TextField
            label="Price"
            variant="outlined"
            margin="normal"
            fullWidth
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Post Service
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ServiceForm;
