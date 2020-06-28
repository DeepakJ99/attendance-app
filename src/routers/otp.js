var otpGenerator = require('otp-generator')
const express = require('express')
const otprouter = new express.Router()
const Class = require('../models/class.js')
const { Attendance } = require('../models/attendance.js')
const auth = require('../middleware/authentication.js')

otprouter.post('/markbyotp',auth, async (req,res)=>{
    const otp = req.body.otp
    console.log('here1')
    console.log(req.user._id)
    try{
        await Attendance.findOneAndUpdate({
            OTP:otp
        },{
            $push:{
                studentsMarked:req.user._id
            }
        })
    }
        catch(e){
            console.log(e)
        }
        res.redirect('/student-dashboard')
})

otprouter.post('/generateOTP',auth,async (req,res)=>{
    console.log('otpreq')
    const otp = otpGenerator.generate(6, {alphabets:false, upperCase: false, specialChars: false });
    req.body.OTP = otp;
    const ci = req.body.classIndex
    try{
        const classes = await Class.find({})
        const reqClassID = classes[ci[0]]._id
        if(req.body.activate[0] == 'true'){
            var date = new Date()
            var a = new Attendance({
                timestamp:date.getTime(),
                OTP:otp
            })
            await a.save()
            await Class.findOneAndUpdate({_id:reqClassID},{
                active:true,
                OTP:otp,
                $push:{
                        attendances: a
                    }
            })
        }

        else{
            await Class.findOneAndUpdate({_id:reqClassID},{
                active:false,
            })
        }
        
    
    }
    catch(e){
        console.log(e)
    }
    res.redirect('/teacher-dashboard')
})

module.exports = otprouter