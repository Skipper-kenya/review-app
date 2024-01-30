import userModel from "../models/user.js";

export const isUserAdmin = async (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    return res.send({ message: "make sure you're signed in", success: false });
  }

  try {
    const adminUser = await userModel.find({ role: 1 });

    if (adminUser) {
      return res.send({ admin: 1 });
    } else {
      return next();
    }
  } catch (error) {
    console.log(error.message);
  }
};
