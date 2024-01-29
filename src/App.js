import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ServiceForm from "./components/ServiceForm";
import ServiceList from "./components/ServiceList";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./components/NotFoundPage"; // Import the new component
import Navbar from "./components/Navbar";
import Message from "./components/Messages";
import ViewOrdersPage from "./components/Order";
import LandingPage from "./components/LandingPage";

function App() {
  const [username, setUsername] = useState("Home");
  const isLoogedIn = localStorage.getItem("token");
  const isLandingPage = window.location.pathname === '/landing';

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <Router>
      
   
          <Navbar username={username} onLogout={handleLogout} />
  
      <Routes>
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/post-service"
          element={
            <ProtectedRoute>
              <ServiceForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <ServiceList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <ViewOrdersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Message />
            </ProtectedRoute>
          }
        />

        {/* Add other routes as needed */}

        {/* Catch-all route for 404 Not Found page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
