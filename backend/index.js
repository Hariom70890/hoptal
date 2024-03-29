const express = require("express");
const {connection} = require("./db");
const dotenv = require("dotenv");
const cors = require("cors");
const {userRouter} = require("./routes/user.Routes");
const patientRouter = require("./routes/patient.Routes");

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Mount routers
app.use("/users", userRouter);
app.use("/patient", patientRouter)

app.get("/", (req,res)=>{
  res.send("Hello")
});

const port = process.env.PORT || 3001;

// Start the server and connect to the database
app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to the database");
    console.log(`Server is listening on port ${port}`);
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
  }
});