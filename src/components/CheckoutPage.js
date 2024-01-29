import React, { useState } from 'react';
import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  Button,
  TextField,
  Grid,
  Divider,
} from '@mui/material';
import axios from 'axios';

const CheckoutModal = ({ open, onClose, serviceDetails }) => {
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [showPaymentFields, setShowPaymentFields] = useState(false);

  const formattedDate = new Date(serviceDetails.createdAt).toLocaleString();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleContinue = () => {
    // Perform any necessary checks or validations before showing payment fields
    setShowPaymentFields(true);
  };


  const handlePay = async () => {
    const {cardNumber , expiryDate ,cvv}=paymentInfo
    if(!cardNumber || !expiryDate || !cvv) return;
    try {
        const message = ` New Order \n\n Hi ${serviceDetails.username},\n\n` +
        `I hope this message finds you well. I'm interested in requesting a new service from you. The details are as follows:\n\n` +
        `Service Title: ${serviceDetails.title}\n` +
        `Price: ${serviceDetails.price} SAR \n\n` +
        `Please let me know if you are available and if we can proceed with this service. Looking forward to hearing from you!\n\n` +
        `Best regards,\n`;      // Assuming payment is successful, send a message to the user
      // Make API call to send a message (replace with your actual messaging API endpoint)
      await saveOrder()
      const messageResponse = await sendMessageToUser(serviceDetails._id, message);
      console.log('Message sent:', messageResponse);

      // Close the modal after successful payment and messaging
      onClose();
    } catch (error) {
      console.error('Error processing payment:', error);
      // Handle payment error (display error message, etc.)
    }
  };

  const sendMessageToUser = async (userId, message) => {
    // Make API call to send a message (replace with your actual messaging API endpoint)
    try {
      const token = localStorage.getItem('token'); // Assuming you have a token for authentication
      const response = await fetch(`http://localhost:5000/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          toUserId: userId,
          text: message,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  const saveOrder = async () => {
    try {
      // Make API call to create a new order
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/orders', { serviceId: serviceDetails.serviceId }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      // Add logic for handling successful order creation if needed
      console.log('Order created successfully:', response.data);
    } catch (error) {
      console.error('Error creating order:', error.message);
      // Add logic for handling order creation error if needed
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
  
    >
      <Fade in={open}>
        <div style={{ background: '#fff', padding: 20, maxWidth: 800, margin: 'auto', borderRadius: 8 }}>
          <Typography variant="h5" gutterBottom>
            Checkout
          </Typography>
         
          <Divider style={{ margin: '10px 0' }} />
          <Typography variant="body1">
            Service: {serviceDetails.title}
          </Typography>
          <Divider style={{ margin: '10px 0' }} />
          <Typography variant="body1">
            Description: {serviceDetails.description}
          </Typography>
          <Divider style={{ margin: '10px 0' }} />
          <Typography variant="body1">
            Price: {serviceDetails.price} SAR
          </Typography>
          <Divider style={{ margin: '10px 0' }} />
          <Typography variant="body1">
            VAT (15%): {((serviceDetails.price * 0.15)).toFixed(2)} SAR
          </Typography>
          <Divider style={{ margin: '10px 0' }} />
          <Typography variant="body1">
            Total: {(serviceDetails.price + (serviceDetails.price * 0.15)).toFixed(2)} SAR
          </Typography>
          <Divider style={{ margin: '10px 0' }} />
          <Typography variant="body1">
            Date: {formattedDate}
          </Typography>
          <Divider style={{ margin: '10px 0' }} />
       { !showPaymentFields  && <Button
            variant="contained"
            color="primary"
            onClick={handleContinue}
            style={{ marginTop: 20,width:"100%" }}
          >
            Continue To Pay
          </Button>}
          {showPaymentFields && (
            <React.Fragment>
              <Grid container spacing={2} style={{ marginTop: 10 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Card Number"
                    variant="outlined"
                    name="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Expiry Date"
                    variant="outlined"
                    name="expiryDate"
                    value={paymentInfo.expiryDate}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="CVV"
                    variant="outlined"
                    name="cvv"
                    value={paymentInfo.cvv}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePay}
                style={{ marginTop: 20,width:"100%" }}
                >
                Pay
              </Button>
            </React.Fragment>
          )}
        </div>
      </Fade>
    </Modal>
  );
};

export default CheckoutModal;
