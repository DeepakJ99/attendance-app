const express = require('express')
const ttrouter = new express.Router()
const { TimeTable } = require('../models/timetable.js')
const Class  = require('../models/class.js')

const auth = require('../middleware/authentication.js')

ttrouter.get('/getTimeTable',auth,async (req,res)=>{
    try{
        res.send(req.user.timetable)
    }
    catch(e){
        console.log(e)
    }
    res.redirect('/student-dashboard')
})
ttrouter.post('/newtimetable',auth,async (req,res)=>{
    const timetable = new TimeTable(req.body)
    try{
        await Class.findByIdAndUpdate({_id:req.user._id},{
            timetable:timetable
        })
        await timetable.save()
    }
    catch(e){
        console.log(e)
    }
    res.redirect('/student-dashboard')
})