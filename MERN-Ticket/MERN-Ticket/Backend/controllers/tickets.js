import express from "express";
import mongoose from "mongoose";
import Ticket from "../models/tickets.js";
import moment from "moment";

export const createTicket = async (req, res) => {
  const { empid, ticket_desc, creator, empname } = req.body;

  const newTicket = new Ticket({
    ticket_desc: ticket_desc,
    empid: empid,
    creator: creator,
    createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
    empname: empname,
    Date: moment().toISOString(),
  });

  try {
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getTickets = async (req, res) => {
  try {
    const ticket = await Ticket.find().sort({Date:-1});
    res.status(200).json(ticket);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateTicket = async (req, res) => {
  const ticket = req.body;
  const { id } = req.params;
  const { empid, ticket_desc, creator } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No ticket with id: ${id}`);

  const updatedTicket = {
    ...ticket,
    creator,
    empid,
    ticket_desc,
    updatedAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
    _id: id,
  };

  const newTicket = await Ticket.findByIdAndUpdate(id, updatedTicket, { new: true });
  console.log("Hey");
  res.json(newTicket);
};



export const deleteTicket = async (req, res) => {
  console.log(req.params)
  const {id} = req.params
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No ticket with id: ${id}`);

  const delTicket = await Ticket.findByIdAndUpdate(id, {Resolved: true, DeletedAt: moment().format("MMMM Do YYYY, h:mm:ss a")}, { new: true });
  console.log(delTicket)

  res.json(delTicket);
};

export const geticketById = async(request,response)=>{
  console.log(request.params)
  try{
      const ti=await Ticket.findById(request.params.id);
      response.status(200).json(ti);
  }catch(error){
      response.status(404).json({message:error.message})
  }
}



