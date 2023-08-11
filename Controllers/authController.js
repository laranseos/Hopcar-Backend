import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
// user register
export const register = async (req, res) => {
   try {
      //hashing password
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(req.body.credentials.password, salt)

      const newUser = new User({
         email:req.body.credentials.email,
         firstname: req.body.credentials.firstname,
         lastname:req.body.credentials.lastname,
         birthday:req.body.credentials.birthday,
         gender:req.body.credentials.gender,
         password: hash,
         //photo: req.body.photo,
      })
      console.log(newUser)
      await newUser.save()
      res.status(200).json({ success: true, message: "Successfully created!" })
   } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: "Failed to create! Try again." })
   
   }
}

// user login
export const login = async (req, res) => {
   try {
      const {email} = req.body
      const user=await User.findOne({ email:email })
      console.log(user)
      // if user doesn't exist
      if (!user) {
         return res.status(404).json({ success: false, message: 'User not found!' })
      }

      // if user is exist then check the password or compare the password
      const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password)

      // if password incorrect 
      if (!checkCorrectPassword) {
         res.status(401).json({ success: false, message: "Incorrect email or password!" })
      }
      else{
         console.log(user._doc)
         const { role, ...rest } = user._doc

         // create jwt token
         const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn:"15d" })

         // set token in the browser cookies and send the response to the client
         res.status(200).json({accessToken:token, message:"Successfully login",id:user._id})
      }
   } catch (error) {
      res.status(500).json({ success: false, message: "Failed to login" })
   }
}

export const logout =(req,res)=>{
   const {email}=req.body
   const accessToken = req.cookies['accessToken']
   console.log({accessToken})
   console.log(email)
   try {
      res.status(200).clearCookie("accessToken").json({ success: true, message: 'Successfully logouted' })
   } catch (error) {
      res.status(500).json({ success: false, message: 'Internal Server Error' })
   }
}