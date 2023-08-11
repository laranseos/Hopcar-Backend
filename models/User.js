import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique:true
    },
    firstname: {
      type: String,
      required:true,
    },
    lastname: {
      type: String,
      required:true,
    },
    phonenumber:{
      type:String,
      default:""
    },
    password: {
      type: String,
      required: true,
    },
    role:{
      type:String,
      default:"user"
    },
    avatar: {
      type: String,
      default:""
    },

    birthday:{
      type:String,
      required:true
    },
    gender:{
      type:String,
      required:true,
    },

    bio:{
      type:String,
      default:""
    },
    isvehicle:{
      type:Boolean,
      default:false
    },
    vehicle_license_number:{
      type:String,
      default:""
    },
    vehicle_brand:{
      type:String,
      default:""
    },
    vehicle_model:{
      type:String,
      default:""
    },
    vehicle_kind:{
      type:String,
      default:""
    },
    vehicle_color:{
      type:String,
      default:""
    },
    vehicle_age:{
      type:Number,
      default:0
    },
    isavatar:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);


export default mongoose.model("User", userSchema);
