import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Typography,
  Grid,
} from "@mui/material";

import "./Navbar.css";
import Loader from "./Loader";

const Message = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loader, setLoader] = useState(true);
  const [users, setUsers] = useState([]);
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://general-be1-eeea8a48c7e4.herokuapp.com/api/messages/users/list",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(response.data);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    const fetchNewUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://general-be1-eeea8a48c7e4.herokuapp.com/api/messages/list/new-users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setNewUsers(response.data);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching new users:", error);
      }
    };
    fetchNewUsers();
    fetchUsers();
  }, []); // Run once when the component mounts

  const handleUserClick = async (user) => {
    setSelectedUser(user);
    setLoader(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://general-be1-eeea8a48c7e4.herokuapp.com/api/messages/${user._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessages(response.data);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSend = async () => {
    if (messageInput.trim() === "" || !selectedUser) return;
    setLoader(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://general-be1-eeea8a48c7e4.herokuapp.com/api/messages",
        {
          toUserId: selectedUser._id,
          text: messageInput,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessages((prevMessages) => [...prevMessages, response.data]);
      setMessageInput("");
      setLoader(false);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Grid container spacing={5} style={{ marginTop: 5 }}>
      {loader ? (
        <Loader />
      ) : (
        <Grid item xs={3} className="side">
          <Typography variant="h6">Users</Typography>
          <List>
            {users.map((user) => (
              <ListItem
                key={user._id}
                button
                onClick={() => handleUserClick(user)}
              >
                <ListItemText primary={user.username} />
              </ListItem>
            ))}
          </List>

          <Typography variant="h6">New Chat</Typography>
          <List>
            {newUsers.map((user) => (
              <ListItem
                key={user._id}
                button
                onClick={() => handleUserClick(user)}
              >
                <ListItemText primary={user.username} />
              </ListItem>
            ))}
          </List>
        </Grid>
      )}
      {loader ? (
        <Loader />
      ) : (
        <Grid className="side" style={{ padding: 10 }} item xs={9}>
          {selectedUser ? (
            <div>
              <Typography variant="h5">
                Messages with {selectedUser.username}
              </Typography>
              <div
                style={{ height: "50vh", overflowY: "auto", padding: "10px" }}
              >
                {messages.map((message) => (
                  <div
                    key={message._id}
                    style={{
                      textAlign:
                        message.toUser === selectedUser._id ? "right" : "left",
                    }}
                  >
                    <div
                      className={
                        message.toUser === selectedUser._id
                          ? "sent-message"
                          : "received-message"
                      }
                    >
                      <Typography variant="body1">{message.text}</Typography>
                      <Typography variant="caption">
                        {" "}
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
              <TextField
                label="Type your message"
                variant="outlined"
                fullWidth
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSend}
                style={{ marginTop: 10 }}
              >
                Send
              </Button>
            </div>
          ) : (
            <Typography variant="h5">Select a user to view messages</Typography>
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default Message;
