import twilio from "twilio"

export const sendVerifyCode = async(req,res)=>{
    const accountSid = 'AC62d1c8617e93db7784564df8d8651cf6'
    const authToken = 'c50ab9b379494db03864c529e9281845'
    const client = twilio(accountSid, authToken)
    const {phoneNumber} = req.body;
    console.log(phoneNumber);
    process.env.VERIFICATION_CODE=Math.floor(100000+Math.random()*900000) // generate random 5-digit number
    process.env.GENERATED_TIME=Date.now()
    client.messages.create({
        body: `Your verification code is ${process.env.VERIFICATION_CODE}`,
        to: phoneNumber,
        from: '+385994643517'
    })
    .then(message => {
        console.log(message.sid);
        res.status(200).json({success:true,message:`Verification code ${process.env.VERIFICATION_CODE} has been sent to ${phoneNumber}.`});
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({success:false,message:'Failed to send verification code.'});
    });
}

export const verifyPhoneNumber =(req,res)=>{
    const {verificationCode}=req.body
    console.log(verificationCode)
    console.log(process.env.VERIFICATION_CODE)
    if(verificationCode==process.env.VERIFICATION_CODE){
          if((Date.now()-process.env.GENERATED_TIME)<process.env.VALID_DURATION){
             console.log("This phone number is verified")
             res.status(200).json({success:true,data:"verifypassed"})
          }else{
             console.log("This code is expired, please try again")
             res.status(400).json({success:false,data:"This code is expired, please try again"})
          }
    }else{
          console.log("The code is incorrect,try again")
          res.status(400).json({succcess:false,data:"The code is incorrect,try again"})
    }
 }