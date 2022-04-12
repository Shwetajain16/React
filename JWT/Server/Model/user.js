import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String},
  username:{ type: String},
  email: { type: String},
  password: { type: String},
  
});
var user = mongoose.model("User", userSchema)
export default user