import express from "express";
import registerController from "../controller/registerController.js";
import signinController from "../controller/signinController.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/signin", signinController);

export { router as usersRoute };
