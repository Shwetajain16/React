import express from "express";
const router = express.Router();

import { signin, signup } from "../controllers/user.js";
// import { validateUser, validateUserSignUp } from "../middleware/authservice.js";

router.post("/signin", signin);
router.post("/signup", signup);

export default router; 