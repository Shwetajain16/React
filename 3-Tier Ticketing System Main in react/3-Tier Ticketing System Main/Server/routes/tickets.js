import express from "express";
import {
  createTicket,
  getTickets,
  updateTicket,
  deleteTicket,
  getTicketsByName,
} from "../controllers/tickets.js";
const router = express.Router();
import auth from "../middleware/auth.js";

router.get("/", getTickets);
router.post("/", auth, createTicket);
router.patch("/:id", auth, updateTicket);
router.post("/delete", auth, deleteTicket);

router.get("/search", auth, getTicketsByName);
export default router;
