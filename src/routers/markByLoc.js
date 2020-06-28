const express = require('express')
const locrouter = new express.Router()
const Class  = require('../models/class.js')
const att = require('../models/attendance.js')
const Attendance = att.Attendance
const auth = require('../middleware/authentication.js')

locrouter.post('/activatebylocation',auth,async (req,res)=>{
    const ci = req.body.classIndex
    try{
        const classes = await Class.find({})
        const reqClassID = classes[ci[0]]._id
        if(req.body.activeByLoc[0] == 'true'){
            var date = new Date()
            var a = new Attendance({
                timestamp:date.getTime(),
            })
            await a.save()
            await Class.findOneAndUpdate({_id:reqClassID},{
                active:true,
                activeByLoc:true,
                $push:{
                        attendances: a
                    }
            })
        }

        else{
            await Class.findOneAndUpdate({_id:reqClassID},{
                active:false,
                activeByLoc:true
            })
        }
        
    
    }
    catch(e){
        console.log(e)
    }
    res.redirect('/teacher-dashboard')
})

locrouter.post('/markbylocation',auth,async (req,res)=>{
    
    try{
        const c = await Attendance.find({}).sort('timestamp')
        const reqAt = c[c.length-1]

        await Attendance.findOneAndUpdate({
            _id:reqAt._id
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


module.exports = locrouter