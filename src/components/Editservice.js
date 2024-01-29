import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
} from '@mui/material';
import { fetchUserServices, editService, deleteService } from '../api.js';

const EditService = () => {
  const [services, setServices] = useState([]);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedPrice, setEditedPrice] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      const userToken = localStorage.getItem('token');
      const serviceList = await fetchUserServices(userToken);
      setServices(serviceList);
    };

    fetchServices();
  }, []);

  const handleEditClick = (serviceId, title, description, price) => {
    setEditingServiceId(serviceId);
    setEditedTitle(title);
    setEditedDescription(description);
    setEditedPrice(price.toString());
  };

  const handleCancelEdit = () => {
    setEditingServiceId(null);
    setEditedTitle('');
    setEditedDescription('');
    setEditedPrice('');
  };

  const handleSaveEdit = async (serviceId) => {
    const userToken = localStorage.getItem('token');
    await editService(serviceId, editedTitle, editedDescription, parseFloat(editedPrice), userToken);
   
    // Fetch the updated service list
    const updatedServiceList = await fetchUserServices(userToken);
    setServices(updatedServiceList);


    // Reset editing state
    handleCancelEdit();
    window.location.reload()

  };

  const handleDeleteService = async (serviceId) => {
    const userToken = localStorage.getItem('token');
    await deleteService(serviceId, userToken);

    // Fetch the updated service list
    const updatedServiceList = await fetchUserServices(userToken);
    setServices(updatedServiceList);
    window.location.reload()
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Your Services
      </Typography>
      {services.length === 0 ? (
        <Typography variant="body1">
          You have no services yet.
        </Typography>
      ) : (
        <List>
          {services.map((service) => (
            <ListItem key={service._id}>
              {editingServiceId === service._id ? (
                <>
                  <TextField
                    label="Title"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                  <TextField
                    label="Description"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    multiline
                    rows={3}
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />
                  <TextField
                    label="Price"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    type="number"
                    value={editedPrice}
                    onChange={(e) => setEditedPrice(e.target.value)}
                  />
                  <Button onClick={() => handleSaveEdit(service._id)} color="primary">
                    Save
                  </Button>
                  <Button onClick={handleCancelEdit} color="secondary">
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <ListItemText
                    primary={service.title}
                    secondary={`Description: ${service.description}, Price: $${service.price}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => handleEditClick(service._id, service.title, service.description, service.price)}>
                      Edit
                    </IconButton>
                    <IconButton onClick={() => handleDeleteService(service._id)}>
                      Delete
                    </IconButton>
                  </ListItemSecondaryAction>
                </>
              )}
            </ListItem>
          ))}
        </List>
      )}
   
    </div>
  );
};

export default EditService;
