import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  location: String,
  githubOnly: { type: Boolean, default: false },
  avatarUrl: String,
});

userSchema.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, 5); 
});

const User = mongoose.model("User", userSchema);


export default User;