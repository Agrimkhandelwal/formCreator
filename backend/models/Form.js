import mongoose from "mongoose";

const FormSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },

    field:[
        {
            type:{
                type:String,
                required:true,
            },
            label:{
                type:String,
                required:true,
            },
            option:[String],
            required:{
                type:Boolean,
                default:false,
            },
        },
    ],
  status: {
    type: String,
    enum: ["draft", "published"], 
    default: "draft",
  },
  createdAt: { type: Date, default: Date.now },

});

const FormModel=mongoose.model("Form",FormSchema);

export default FormModel;


