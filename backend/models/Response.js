import mongoose from "mongoose";

const ResponseSchema= new mongoose.Schema({
    formId:{
        type:mongoose.Schema.Types.ObjectId,ref:"form"
    },
    answer:Object,
    submittedAt:{
        type:Date,
        default:Date.now,
    },


});

const ResponseModel=mongoose.model("Response",ResponseSchema);

export default ResponseModel;