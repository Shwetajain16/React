import express from "express";
import mongoose from "mongoose";

import moment from "moment";
import Complaint from "../models/compaint.js";

export const createComplaint = async (req, res) => {
  const { title, complaint_desc, creator, username } = req.body;

  const newComplaint = new Complaint ({
   complaint_desc: complaint_desc,
    title: title,
    creator: creator,
    createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
    username: username,
    Date: moment().toISOString(),
  });

  try {
    await newComplaint.save();
    res.status(201).json(newComplaint);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getComplaint = async (req, res) => {
  try {
    const Complaint = await Complaint.find().sort({Date:-1});
    res.status(200).json(Complaint);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateComplaint = async (req, res) => {
  const Complaint = req.body;
  const { id } = req.params;
  const { title, complaint_desc, creator } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No complaint with id: ${id}`);

  const updateComplaint = {
    ...Complaint,
    creator,
    title,
    complaint_desc,
    updatedAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
    _id: id,
  };

  const newComplaint = await Complaint.findByIdAndUpdate(id, updateComplaint, { new: true });
  console.log("Hey");
  res.json(newComplaint);
};



export const deleteComplaint = async (req, res) => {
  console.log(req.params)
  const {id} = req.params
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No artical with id: ${id}`);

  const delArtical = await Artical.findByIdAndUpdate(id, {Resolved: true, DeletedAt: moment().format("MMMM Do YYYY, h:mm:ss a")}, { new: true });
  console.log(delArtical)

  res.json(delArtical);
};

export const getComplaintById = async(request,response)=>{
  console.log("Update backend")
  console.log(request.params)
  try{
      const ti=await Artical.findById(request.params.id);
      response.status(200).json(ti);
      console.log(ti)
  }catch(error){
      response.status(404).json({message:error.message})
  }
  
}



