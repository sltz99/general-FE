// src/api.js

const API_BASE_URL = 'https://general-be1-eeea8a48c7e4.herokuapp.com'; // Replace with your server's URL

export const registerUser = async (email, username, password, phoneNumber) => {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, username, password, phoneNumber })
        });
        return response;
    } catch (error) {
        console.error('Registration error:', error);
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`https://general-be1-eeea8a48c7e4.herokuapp.com/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        return response.json();
    } catch (error) {
        console.error('Login error:', error);
    }
};

export const postService = async (title, description, price, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/service`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, description, price })
        });
        return response;
    } catch (error) {
        console.error('Service posting error:', error);
    }
};

// ... (other imports and functions)

export const orderService = async (serviceId, token) => {
    try {
      const response = await fetch(`https://general-be1-eeea8a48c7e4.herokuapp.com/order-service`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ serviceId })
      });
      return response.json();
    } catch (error) {
      console.error('Error ordering service:', error);
    }
  };
  
  export const rateService = async (orderId, rating, token) => {
    try {
      const response = await fetch(`https://general-be1-eeea8a48c7e4.herokuapp.com/rate-service`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ orderId, rating })
      });
      return response.json();
    } catch (error) {
      console.error('Error rating service:', error);
    }
  };
  // api.js

export const fetchServices = async () => {
    try {
      const response = await fetch('https://general-be1-eeea8a48c7e4.herokuapp.com/services'); // Adjust URL as per your backend route
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error;
        }
        };

        export const fetchUserServices = async (userToken) => {
          try {
            const response = await fetch(`${API_BASE_URL}/servicesUser`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json',
              },
            });
        
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
        
            return await response.json();
          } catch (error) {
            console.error('Error fetching services:', error);
            throw error;
          }
        };
        
        export const editService = async (serviceId, title, description, price, userToken) => {

          console.log(serviceId)
          try {
            const response = await fetch(`${API_BASE_URL}/services/${serviceId}`, {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                title,
                description,
                price,
              }),
            });
        
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
          } catch (error) {
            console.error('Error editing service:', error);
            throw error;
          }
        };
        
        export const deleteService = async (serviceId, userToken) => {
          try {
            const response = await fetch(`${API_BASE_URL}/services/${serviceId}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json',
              },
            });
        
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
          } catch (error) {
            console.error('Error deleting service:', error);
            throw error;
          }
        } 