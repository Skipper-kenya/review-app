import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

const signinController = async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });

  if (!user) {
    return res.send({
      message: "Login Failed:user does not exist",
      success: false,
    });
  }

  try {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.send({
        message: "Login Failed:Password did not match",
        success: false,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "3h",
    });

  

    return res.send({
      message: "succefull signin",
      success: true,
      token,
      userId: user._id,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default signinController;
