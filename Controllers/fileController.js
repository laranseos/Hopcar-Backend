import User from "../models/User.js";
import path from "path";
export const downLoad=async(req,res)=>{
    const {file} = req
    console.log(file)
    const updateData={avatar:file.path,isavatar:true}
    const {id}=req.query
    await User.findOneAndUpdate({_id:id},updateData,{new:true})
    res.status(200).json({ message: 'File uploaded successfully' });
}

export const upLoad=async(req,res)=>{
    const {id}=req.user
    const user=await User.findById(id)
    const path=user.avatar
    console.log(path)
    if(!path){
        res.status(500).json({success:false})
    }
    else{
        
        const absolutePath=process.cwd()+"\\"+path
        res.status(200).sendFile(absolutePath)
    }
    
}

export const getAvatar=async(req,res)=>{
    const {email}=req.query
    const user=await User.findOne({email:email})
    const path=user.avatar
    console.log(path)
    if(!path){
        res.status(500).json({success:false})
    }
    else{
        const absolutePath=process.cwd()+"\\"+path
        res.status(200).sendFile(absolutePath)
    }
}