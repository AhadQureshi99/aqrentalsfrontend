import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useSelector } from "react-redux";

export default function ChatBox({ socket }) {
  const [open, setOpen] = React.useState(false);
  const { user } = useSelector((state) => state.user);
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  const toggleDrawer = (open) => () => {
    setOpen(open);
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    const newMessage = {
      sender: user?.username || "Unknown",
      text: message,
    };
    socket.emit("send_message", newMessage);
    setMessage("");
  };

  React.useEffect(() => {
    const handleIncomingMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };
    socket.on("show_message", handleIncomingMessage);
    return () => {
      socket.off("show_message", handleIncomingMessage);
    };
  }, [socket]);

  return (
    <div>
      <Button
        variant="contained"
        onClick={toggleDrawer(true)}
        startIcon={<ChatIcon />}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "#F9A826",
          color: "white",
        }}
      >
        {user?.role === "admin" ? "Client Messages" : "Chat Admin"}
      </Button>

      <Drawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "320px", // Adjust width
            height: "400px",
            borderRadius: "15px 15px 0 0", // Rounded top corners
            backgroundColor: "#1E1E1E", // Black background
            color: "white", // White text color
            position: "fixed",
            right: 20,
            bottom: 0,
            zIndex: 1600,
            boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
          {/* Chatbox Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              backgroundColor: "#F9A826",
              color: "white",
            }}
          >
            <Typography variant="h6">Chatbox</Typography>
            <IconButton onClick={toggleDrawer(false)} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Chat Messages */}
          <List
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {messages.map((msg, index) => (
              <ListItem
                key={index}
                sx={{
                  alignSelf: msg.sender === user?.username ? "flex-end" : "flex-start",
                  backgroundColor: msg.sender === user?.username ? "#4CAF50" : "#292A2D", // Green for sender, dark for receiver
                  color: "white",
                  borderRadius: "10px",
                  maxWidth: "70%",
                  p: 1,
                  mb: 1,
                }}
              >
                <Typography variant="body2">
                  <strong>{msg.sender}: </strong> {msg.text}
                </Typography>
              </ListItem>
            ))}
          </List>

          {/* Chat Input Box */}
          <Box sx={{ display: "flex", alignItems: "center", p: 2, borderTop: "1px solid #444" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              sx={{
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#666" },
                  "&:hover fieldset": { borderColor: "#999" },
                  "&.Mui-focused fieldset": { borderColor: "#F9A826" },
                },
              }}
            />
            <IconButton onClick={handleSendMessage} sx={{ ml: 1, color: "#F9A826" }}>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
}
