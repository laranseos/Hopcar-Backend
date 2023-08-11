import nodemailer from 'nodemailer'
import User from '../models/User.js'
export const sendVerifyCode =async(req,res)=>{
   const {email}=req.body
   const user=await User.findOne({email:email})
   if(user!==null){
   res.status(400).json({message:"This email is already exist"})
   }else{
      console.log(email)
      const transporter=nodemailer.createTransport({
         //host: 'smtp.gmail.com',
         port: 587,
         secure: false, // true for 465, false for other ports
         auth: {
            user: 'klaus237192@gmail.com', // your email address
            pass: 'ucybtcwnpnlqvidw' // your email password
         },
         //tls: {rejectUnauthorized: false},
         service:'gmail'
      })
      process.env.VERIFICATION_CODE=Math.floor(100000+Math.random()*900000)
      console.log(process.env.VERIFICATION_CODE)
      process.env.GENERATED_TIME=Date.now()
      const mailOptions={
         from:'klaus237192@gmail.com',
         to:email,
         subject:`Your verification code is ${process.env.VERIFICATION_CODE}`,
         text:"code",
         html:`<h1>Verify your email address</h1>
               <hr><h3><p>Please enter this 6-digit code to access our platform.</p></h3>
               <h2>${process.env.VERIFICATION_CODE}</h2><h3><p>This code is valid for 2 minutes.</p></h3>`
      }
      await transporter.sendMail(mailOptions,(err,info)=>{
         if(err){
            console.log(err)
            res.status(500).json({success:false,message:"Internal Server Error"})
         }else{
            console.log("Email sent successfully")
            res.status(200).json({success:true,message:"Email sent successfully"})
         }
      })
   }
}

export const verifyEmail =(req,res)=>{
   const {verificationCode}=req.body
   console.log(verificationCode)
   console.log(process.env.VERIFICATION_CODE)
   if(verificationCode==process.env.VERIFICATION_CODE){
         if((Date.now()-process.env.GENERATED_TIME)<process.env.VALID_DURATION){
            console.log("This email is valid")
            res.status(200).json({success:true,data:"verifypassed"})
         }else{
            console.log("This code is expired, please try again")
            res.status(400).json({success:false,message:"This code is expired, please try again"})
         }
   }else{
         console.log("The code is incorrect,try again")
         res.status(400).json({succcess:false,message:"The code is incorrect,try again"})
   }
}
 