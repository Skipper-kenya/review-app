import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "username already exists"],
      required: true,
      trim: true,
    },
    password: {
      type: String,
      minLength: 3,
      required: true,
      trim: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

// //HASH PASSWORD
// userSchema.pre("save", async (next) => {
//   if (!this.isModified("password")) {
//     next();
//     console.log("hello");
//   }

//   this.password = await bcrypt.hash(this.password, 10);
// });

export default userModel;
