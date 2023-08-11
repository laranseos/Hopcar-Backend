import User from '../models/User.js'
import bcrypt from "bcryptjs"

export const updateUser = async (req, res) => {
   const {id} = req.user
   const user=await User.findById(id)
   if(req.body.password&&!req.body.newpassword){
      const{password}=req.body
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)
      req.body.password=hash
   }
   if(req.body.password&&req.body.newpassword){
      const {password,newpassword}=req.body
      console.log(password)
      console.log(req.body.newpassword)
      const checkCorrectPassword = await bcrypt.compare(password, user.password)
      console.log(checkCorrectPassword)
      if(checkCorrectPassword){
         const salt = bcrypt.genSaltSync(10)
         const hash = bcrypt.hashSync(newpassword, salt)
         req.body={}
         req.body.password=hash
      }else{
         res.status(400).json({message:"Previous password is incorrect.Try again"})
         return 
      }
      
   }
   try {
      const updateData=req.body
 
      const updatedUser = await User.findOneAndUpdate({_id:id},updateData,{new:true})

      res.status(200).json({ success: true, message: 'Successfully updated', data: updatedUser })
   } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Failed to update' })
   }
}

//Delete User
export const deleteUser = async (req, res) => {
   const {id} = req.user
   
   try {
      await User.findByIdAndRemove(id)
      
      res.status(200).clearCookie("accessToken").json({ success: true, message: 'Successfully deleted' })
   } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to delete' })
   }
}

//Get single User
export const getSingleUser = async (req, res) => {
   const {id} = req.user
   try {
      const user = await User.findById(id)
      console.log(user)
      res.status(200).json({ success: true, message: 'Successfully', data: user })
   } catch (error) {
      res.status(400).json({ success: false, message: 'Not Found' })
   }
}

//GetAll User
export const getAllUser = async (req, res) => {
   //console.log(page)

   try {
      const users = await User.find({})

      res.status(200).json({ success: true, message: 'Successfully', data: users })
   } catch (error) {
      res.status(404).json({ success: false, message: 'Not Found' })
   }
}

export const getNames =async (req,res)=>{
   const {email} = req.query
   console.log(email)
   const user=await User.findOne({email:email})
   res.status(200).json({name:user.firstname})
   res.end()
}

export const getDriverInfo=async(req,res)=>{
   const {email}=req.query
   console.log("odddddddddddddd")
   const user=await User.findOne({email:email})
   console.log(user)
   res.status(200).json({driverInfo:user})
}