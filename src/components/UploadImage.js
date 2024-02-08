import React, { useState } from 'react';
import { Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';

const UploadImage = ({onImageUpload}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', selectedFile);
      const userToken = localStorage.getItem('token');

      const response = await axios.post('https://general-be1-eeea8a48c7e4.herokuapp.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userToken}`, 

        },
      });

      setImageUrl(response.data.imageUrl);
      onImageUpload(response.data.imageUrl)
      setUploading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploading(false);
    }
  };

  return (
    <Container style={{overflow:'scroll'}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Upload Image</Typography>
        </Grid>
        <Grid item xs={12}>
          <input
            accept="image/*"
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="upload-button"
          />
          <label htmlFor="upload-button">
            <Button variant="contained" component="span">
              Choose Image
            </Button>
          </label>
        </Grid>
        <Grid item xs={12}>
          {selectedFile && (
            <Typography variant="body1">Selected File: {selectedFile.name}</Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
          >
            {uploading ? <CircularProgress size={24} /> : 'Upload'}
          </Button>
        </Grid>
        {imageUrl && (
          <Grid item xs={12}>
            <Typography variant="body1">Uploaded Image URL: {imageUrl}</Typography>
            <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%',height:80, marginTop: 10 }} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default UploadImage;
