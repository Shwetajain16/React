import express from 'express';
import mongoose from 'mongoose';

import Ticket from '../models/tickets.js';

export const createTicket = async (req, res) => {
    const ticket = req.body;
   
    const date=new Date();
    const d=date.getDate();
    const m=date.getMonth();
    const y=date.getFullYear();
    const Day=d.toString()+"/"+m.toString()+"/"+y.toString();
    const newTicket = new Ticket({ ...ticket, creator: req.userId, createdAt:Day,Date:new Date().toISOString() })
   
    try {
        await newTicket.save();

        res.status(201).json(newTicket );
    } catch (error) {
     
        res.status(409).json({ message: error.message });
    }
}

export const getTickets = async (req, res) => { 
    try {
        const ticket = await Ticket.find().sort({Date:-1});
                
        res.status(200).json(ticket);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateTicket = async (req, res) => {
    const ticket = req.body;
    const { id } = req.params;
    const { empid, ticket_desc, empname,creator} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No ticket with id: ${id}`);

    const updatedTicket = {...ticket, creator, empid, ticket_desc,updatedAt:new Date().toISOString(), _id: id };

    await Ticket.findByIdAndUpdate(id, updatedTicket, { new: true });

    res.json(updatedTicket);

}

export const deleteTicket = async (req, res) => {
    const ticket = req.body;
  
    const { _id } = req.body;
    const { empid, ticket_desc, empname,creator} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No ticket with id: ${_id}`);

    const deletedTicket = {...ticket,Resolved:true, creator, empid, ticket_desc,DeletedAt:new Date().toISOString(), _id: _id };

    await Ticket.findByIdAndUpdate(_id, deletedTicket, { new: true });

    res.json(deletedTicket);

}
export const getTicketsByName = async (req, res) => {
    const { searchQuery} = req.query;
  
    try {
        const title = new RegExp(searchQuery, "i");
      
        const posts = await Ticket.find({ $or: [ { empname: new RegExp('.*' + searchQuery + '.*') }]}).sort({Date:-1});
    
        res.json(posts);
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}