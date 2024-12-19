// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");

// // Set up Express app
// const app = express();
// const port = 3000;

// // Middleware to parse JSON requests
// app.use(bodyParser.json());

// // MongoDB URI (replace with your MongoDB connection string)
// const mongoURI =
//   "mongodb+srv://sonawanedattu2001:yF6Tu4wSA6v5gprc@cluster0.jlehtgh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // For local MongoDB
// // OR for MongoDB Atlas:
// // const mongoURI = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/smsdb?retryWrites=true&w=majority';

// // Connect to MongoDB
// // Connect to MongoDB without deprecated options
// mongoose
//   .connect(mongoURI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log("MongoDB connection error:", err));

// // Define the SMS Schema
// const smsSchema = new mongoose.Schema({
//   sender: { type: String, required: true },
//   message: { type: String, required: true },
//   receivedAt: { type: Date, default: Date.now },
// });

// // Create the SMS model
// const SMS = mongoose.model("SMS", smsSchema);

// // Route to handle incoming SMS data
// app.post("/sms", async (req, res) => {
//   try {
//     // Create a new SMS document
//     const newSMS = new SMS({
//       sender: req.body.sender,
//       message: req.body.message,
//     });

//     // Save the SMS to the database
//     await newSMS.save();
//     console.log("SMS saved:", newSMS);

//     // Send a response back to the Arduino (or any other client)
//     res.status(200).json({ message: "SMS received and stored" });
//   } catch (error) {
//     console.error("Error saving SMS:", error);
//     res.status(500).json({ message: "Error saving SMS" });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

/////////////////////////////////////////////////////////SOCKET SERVER/////////////////////////////////

// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// // Serve a basic route
// app.get("/", (req, res) => {
//   res.send("Socket.IO Server is running!");
// });

// // Handle socket connections
// io.on("connection", (socket) => {
//   console.log("Client connected:", socket.id);

//   // React Native app sends SMS
//   socket.on("send-sms", (data) => {
//     console.log("data in server", data);
//     if (!data.text || data.text.trim() === "") {
//       console.log("Invalid SMS text received");
//       return; // Reject empty or invalid messages
//     }

//     console.log("SMS from App:", data.text);
//     io.emit("app-send", data);
//     io.emit("gsm-send", data); // Broadcast to GSM client
//   }); //arduino listen gsm-send

//   // GSM module sends a response
//   socket.on("gsm-response", (data) => {
//     console.log("Response from GSM:", data);
//     // Forward GSM response to React Native app
//     io.emit("gsm-response", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//   });
// });

// // Start the server
// const PORT = 3000;
// server.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

//////////////////////////////////////////////HTTP SERVER////////////////////////////////////////////////

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware to parse URL-encoded data (used by SIM800L for HTTP POST)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Optional: In case you switch to JSON data in the future

// Route to handle POST requests
app.post("/api", (req, res) => {
  const receivedMessage = req.body.message; // Extract 'message' field from the POST data

  console.log("Message received from SIM800L:", receivedMessage);

  // Send a response back to confirm receipt
  res.status(200).send("Message received successfully!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
