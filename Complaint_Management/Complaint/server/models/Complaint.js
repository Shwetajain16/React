import mongoose from 'mongoose';

const compalintSchema = mongoose.Schema({
    complaint_desc:{type:String},
    title:{type:String},
    username:{type:String},
    creator: String,
    createdAt: {
        type: String,
       },
    
   
    Date:{
      type: String,
      } ,
   
})
var Cmp = mongoose.model('Cmp', compalintSchema);

export default Cmp;