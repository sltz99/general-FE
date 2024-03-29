import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";

import { red } from "@mui/material/colors";

import { Button, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import CheckoutModal from "./CheckoutPage";
import { MessageOutlined } from "@mui/icons-material";

const ServiceCard = ({
  title,
  serviceId,
  image,
  description,
  price,
  _id,
  username,
  createdAt,
  handleOpen,
}) => {
  const serviceInfo = {
    title,
    serviceId,
    image,
    username,
    description,
    price,
    _id,
    username,
    createdAt,
  };
  const [openModal, setOpenModal] = React.useState(false);

  const onClose = () => {
    setOpenModal(false);
  };
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" height={200} image={image} alt="Service Image" />
        <CardContent>
          <h3 variant="body2" color="text.secondary">
            {title}
            <Chip
              style={{ margin: 5 }}
              label={`${price} SAR`}
              color="success"
              variant="outlined"
            />
          </h3>
          <p variant="body2" color="text.secondary">
            {description}
          </p>

          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="user-avatar">
                {/* {username.charAt(0)} */}
              </Avatar>
            }
            subheader={`Created by ${username} on ${new Date(
              createdAt
            ).toLocaleDateString()}`}
          />
        </CardContent>
        <CardActions>
          <Button variant="contained" color="secondary">
            <Link to={`/messages/`}>
              <MessageOutlined style={{ marginRight: "5px", color: "white" }} />
            </Link>
          </Button>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)}
          >
            Order
          </Button>
        </CardActions>
      </Card>

      <CheckoutModal
        open={openModal}
        onClose={onClose}
        serviceDetails={serviceInfo}
      />
    </>
  );
};

export default ServiceCard;
