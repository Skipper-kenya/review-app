import jwt from "jsonwebtoken";
export const verifyPostToken = async (req, res, next) => {
  const { token } = req.body;

  try {
    if (!token) {
      console.log("no token provided");
      return res.status(401).json({
        success: false,
        message: "make sure you're signed in",
      });
    }

    const isTokenValid = jwt.verify(token, process.env.TOKEN_SECRET);

    if (isTokenValid) {
      return next();
    } else {
      console.log("invalid token");
      return res.status(403).json({ success: false, message: "invalid token" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const verifyParamsToken = async (req, res, next) => {
  const token = req.params.token;

  try {
    if (!token) {
      console.log("no token provided");
      return res.status(401).json({
        success: false,
        message: "make sure you're signed in",
      });
    }

    const isTokenValid = jwt.verify(token, process.env.TOKEN_SECRET);

    if (isTokenValid) {
      return next();
    } else {
      console.log("invalid token");
      return res.status(403).json({ success: false, message: "invalid token" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
