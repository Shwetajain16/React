import express from "express";
const router = express.Router();

import {signup,signin} from '../Controllers/user.js'

router.post('/api/auth/signup',signup);
router.post('/api/auth/signin',signin);

export default router;