import mongoose from 'mongoose';

const complaintSchema = mongoose.Schema({
    artical_desc:{type:String},
    title:{type:String},
    username:{type:String},
    creator: String,
    createdAt: {
        type: String,
       },
    updatedAt:{
       type:String
    },
    DeletedAt:{
      type:String
    },
    Date:{
      type: String,
      } ,
    Resolved:{
      type:Boolean,
      default:false,
    }
})
var Complaint = mongoose.model('Complaint', complaintSchema);

export default Complaint;