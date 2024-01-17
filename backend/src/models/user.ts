import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { UserType } from "../shared/types";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
},{timestamps: true});

//before saving the document to db, idi choosi po, this is a middleware
// using the pre hook for the "save" event on a Mongoose schema.
// The second parameter, 8, is the number of salt rounds used in the hashing process.
// Higher values provide more security but require more computational resources.
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;