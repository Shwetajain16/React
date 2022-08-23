import mongoose from 'mongoose';

const ticketSchema = mongoose.Schema({
    ticket_desc:{type:String},
    empid:{type:Number},
    empname:{type:String},
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
var Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;