import User from './../models/User.js'
import Ride from '../models/Ride.js'

export const bookingRide= async(req,res) => {
   const {id}=req.query
   try{
      const ride=await Ride.findById(id)
      console.log(ride)
      const email=ride.driveremail;
      console.log(email)
      const user=await User.findOne({email:email})
      console.log(user)
      const bookingInfo={
         from:ride.from,
         to:ride.to,
         date:ride.date,
         time:ride.time,
         hours:ride.hours,
         price:ride.price,
         firstname:user.firstname,
         avatar:user.avatar,
         isphoneverified:user.isphoneverified,
         isemailverified:user.isemailverified,
         vehicle:user.vehicle,
         bookedPassengers:ride.bookedPassengers,
         bookedEmail:ride.bookedEmail
      }
      console.log(bookingInfo)
      res.status(200).json({success:true,data:bookingInfo})
   }catch(err){
      console.log(err)
      res.status(500).json({success:false,message:"Something went wrong"})
   }
}

export const createBooking =async(req,res)=>{
   try{
      const {id}=req.user
      const userId=id
      console.log(userId)
      const {rideId}=req.query
      console.log(rideId)
      const ride=await Ride.findOne({_id:rideId})
      const user=await User.findOne({_id:userId})
      const {email}=user
      var {bookedEmail}=ride
      if(!bookedEmail.includes(email)){
         console.log(false)
         const bookedPassengers=ride.bookedPassengers+1
         const passengers=ride.passengers-1
         console.log(bookedPassengers)
         bookedEmail=[...bookedEmail ,email]
         console.log(bookedEmail)
         const newRide=await Ride.findByIdAndUpdate(rideId,{bookedPassengers:bookedPassengers,bookedEmail:bookedEmail,passengers:passengers},{new:true})
         console.log(newRide)
         res.status(200).json({success:true,message:"Successfully created"})
      }
      else{
         res.status(400).json({success:false,message:"You already booked"})
      }
   }catch(err){
      console.log(err)
      res.status(500).json({success:false,message:"Internal Server Error"})
   }

}

export const getBookedRide=async(req,res)=>{
   const {id}=req.query
   const user=await User.findById(id)
   const {email}=user
   const bookedRides=await Ride.find({bookedEmail:{$in:[email]}})
   if(!bookedRides[0]){
      res.status(404).json({message:"There is no booked rides"})
   }else{
      res.status(200).json({bookedRides:bookedRides})
   }
}

export const deleteBooking=async(req, res)=>{
   const {rideId, userId}=req.query
   const user=await User.findById(userId)
   const {email}=user
   await Ride.updateOne({_id:rideId},{$pull:{bookedEmail:email}})
   console.log("successfully deleted")
   res.status(200).json({message:"successfully deleted"})

}