import React, { useState, useEffect } from "react";
import { orderService, rateService, fetchServices } from "../api";
import ServiceCard from "./Card";
import { Box, Button, Grid, Modal } from "@mui/material";
import Loader from "./Loader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px grey #000",
  boxShadow: 24,
  p: 4,
};

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const getServices = async () => {
      try {
        const fetchedServices = await fetchServices();
        setServices(fetchedServices);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        // Optionally handle the error, e.g., show a message to the user
      } finally {
      }
    };

    getServices();
  }, []);

  return (
    <div style={{ margin: 50 }}>
      <h2>Available Services</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {services.map((service) => (
            <Grid item xs={3} key={service._id}>
              <ServiceCard
                serviceId={service._id}
                title={service.title}
                description={service.description}
                price={service.price}
                _id={service.user._id}
                username={service.user.username} // Assuming the user object is nested within service
                createdAt={service.createdAt}
                handleOpen={handleOpen}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 id="modal-modal-title">serviceName:{"serviceName"}</h2>
          <p id="modal-modal-description">description:{"description"}</p>
          <p>Price: ${"price"}</p>
          <Button variant="contained" onClick={() => {}}>
            Confirm Order
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ServiceList;
