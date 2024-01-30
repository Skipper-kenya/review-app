import userModel from "../models/user.js";

export const determineAdmin = async (req, res) => {
  const { id } = req.body;

  try {
    const adminUser = await userModel.findById({ _id: id });

    if (adminUser.role === 1) {
      return res.send({ isAdmin: true });
    } else {
      return res.send({ isAdmin: false });
    }
  } catch (error) {
    console.log(error.message);
  }
};
