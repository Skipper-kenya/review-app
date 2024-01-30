import bcrypt from "bcrypt";

import userModel from "../models/user.js";

const registerController = async (req, res) => {
  const { username, password } = req.body;

  const userExists = await userModel.findOne({ username });

  if (userExists) {
    return res.send({ success: false, message: "user already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = new userModel({ username, password: hashedPassword });
    await createUser.save();

    if (username === process.env.ADMIN_USER) {
      const updateModel = await userModel.findOneAndUpdate(
        { username },
        { $set: { role: 1 } },
        { new: true }
      );
    }
    return res.send({ success: true, message: "user created" });
  } catch (error) {
    console.log(error.message);
  }
};

export default registerController;
