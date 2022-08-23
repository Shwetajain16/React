import express from "express";
import {
  createTicket,
  getTickets,
  updateTicket,
  deleteTicket,
  geticketById,
  
} from "../controllers/tickets.js";
const router = express.Router();
import auth from "../middleware/authsevice.js";

router.get("/", getTickets);
router.post("/",auth,createTicket);
router.patch("/:id",auth,updateTicket);
router.post("/delete/:id",auth,deleteTicket);
router.get("/:id",geticketById)

export default router;
