const mongoose = require("mongoose");

// Define the user schema
const userSchema = mongoose.Schema(
   {
      username: {
         type: String,
         required: true,
      },
   
      password: {
         type: String,
         required: true,
      },
      role: ["USER", "ADMIN"],
   },
   {
      versionKey: false, // Disable versioning
   }
);

// Create the user model based on the schema
const userModel = mongoose.model("User", userSchema);

// Export the user model for use in other modules
module.exports = { userModel };
