import express from "express";
import mongoose from "mongoose";
import moment from "moment";
import Cmp from '../models/Complaint'


export const createComplaint = async (req, res) => {
  console.log("Create complaint")
  const { title,complaint_desc, creator, username } = req.body;

  const newComplaint = new Cmp({
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
  console.log("fetch complain")
  try {
    const C = await Cmp.find().sort({Date:-1});
    res.status(200).json(C);
    console.log(C)
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateComplaint = async (req, res) => {
  const complaint = req.body;
  const { id } = req.params;
  const { title, complaint_desc, creator } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Complaint with id: ${id}`);

  const updateComplaint = {
    ...complaint,
    creator,
    title,
    complaint_desc,
    updatedAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
    _id: id,
  };

  const newComplaint = await Cmp.findByIdAndUpdate(id, updateComplaint, { new: true });
  console.log("Hey");
  res.json(newComplaint);
};



// export const deleteComplaint = async (req, res) => {
//   console.log(req.params)
//   const {id} = req.params
//   if (!mongoose.Types.ObjectId.isValid(id))
//     return res.status(404).send(`No Complaint with id: ${id}`);

//   const delComplaint= await Cmp.findByIdAndUpdate(id, {Resolved: true, DeletedAt: moment().format("MMMM Do YYYY, h:mm:ss a")}, { new: true });
//   console.log(delComplaint)

//   res.json(delComplaint);
// };

export const deleteComplaint=async(request,response)=>{
    try{
        await Cmp.deleteOne({_id:request.params.id});
        response.status(201).json("Complaint Deleted Successfully");
    }catch(error){
        response.status(409).json({message:error.message});
    }
}

export const getComplaintById = async(request,response)=>{
  console.log("Update backend")
  console.log(request.params)
  try{
      const ti=await Cmp.findById(request.params.id);
      response.status(200).json(ti);
      console.log(ti)
  }catch(error){
      response.status(404).json({message:error.message})
  }
  
}



