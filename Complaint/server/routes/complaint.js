import express from "express";
import {
  getComplaint,
  updateComplaint,
  deleteComplaint,
  getComplaintById,
  createComplaint
  
} from "../controllers/complaint.js"
const router = express.Router();
//import auth from "../middleware/authsevice.js";

router.get("/", getComplaint);
router.post("/",createComplaint);
router.patch("/:id",updateComplaint);
router.post("/delete/:id",deleteComplaint);
router.get("/:id",getComplaintById)

export default router;
