// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import axios from "axios";

const ViewOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the backend API
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming you have a token for authentication

        const response = await axios.get("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };

    fetchOrders();
  }, []);

  const completeOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("token"); // Assuming you have a token for authentication
      await axios.post(
        `http://localhost:5000/api/orders/${orderId}/complete`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the orders after completing an order
      const updatedOrders = orders.map((order) =>
        order?._id === orderId ? { ...order, completed: true } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error completing order:", error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Your Orders
      </Typography>
      {orders.length > 0 ? (
        <List>
          {orders.map((order, index) => (
            <React.Fragment key={order?._id}>
              <Paper
                elevation={3}
                style={{ padding: "15px", marginBottom: "15px" }}
              >
                <Typography variant="h6" gutterBottom>
                  Order #{index + 1}
                </Typography>
                <Typography variant="body1">
                  Service: {order?.service?.title}
                </Typography>
                <Typography variant="body1">
                  Order Date: {new Date(order?.orderDate).toLocaleDateString()}
                </Typography>
                {order?.completed && (
                  <Typography variant="body1" style={{ color: "green" }}>
                    Completed
                  </Typography>
                )}
                {!order?.completed && (
                  <React.Fragment>
                    <Typography variant="body1" style={{ color: "orange" }}>
                      Pending
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => completeOrder(order?._id)}
                      style={{ marginTop: "10px" }}
                    >
                      Complete Order
                    </Button>
                  </React.Fragment>
                )}
              </Paper>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Typography variant="body1">You have no orders yet.</Typography>
      )}
    </div>
  );
};

export default ViewOrdersPage;
