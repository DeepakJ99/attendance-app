
const express = require('express')
const crouter = new express.Router()
const User = require('../models/user.js')
const Class  = require('../models/class.js')
const auth = require('../middleware/authentication.js')
const randomString = require('randomstring')



crouter.post('/createnewclass',auth, async (req,res)=>{
    console.log(req.body)
    req.body.classCode = randomString.generate({
        length: 8,
        charset: 'alphabetic'
      });
    
    req.body.location  = JSON.parse(req.body.location)
    
    
    
    
    var l1 = {
        
            minLong : Math.min(req.body.location[0].long,req.body.location[1].long,req.body.location[2].long,req.body.location[3].long),
            maxLong : Math.max(req.body.location[0].long,req.body.location[1].long,req.body.location[2].long,req.body.location[3].long),
            minlat : Math.min(req.body.location[0].lat,req.body.location[1].lat,req.body.location[2].lat,req.body.location[3].lat),
            maxlat : Math.max(req.body.location[0].lat,req.body.location[1].lat,req.body.location[2].lat,req.body.location[3].lat)
    }
    req.body.location = l1
    const c =await new Class(req.body)
    console.log(c)
    try{
        await c.save()
        await User.findOneAndUpdate({_id:req.user._id},{
            $push:{classes:{classId:c._id}
            }
        })
        
    }
    catch(e){
        console.log(e)
        //res.redirect('/teacher-dashboard')
    }
    res.redirect('/teacher-dashboard')
})
crouter.get('/getmyclasses',auth, async(req,res)=>{
    try{
        const c = req.user.classes
        let classes = []
        let i = 0
        while(i < c.length){
           
            const temp = await Class.findOne({_id:c[i].classId})
            //console.log(temp)
            classes.push(temp)
            i= i + 1
            
        }
        console.log(classes)
        res.send(classes)
    }
    catch(e){
        res.send(e)
    }
})

crouter.get('/getmyoneclass/:id',auth, async(req,res)=>{
    try{
        const c = await Class.find({})
        res.send(c[req.params.id])
    }
    catch(e){
        console.log(e)
    }
})
crouter.post('/joinnewclass',auth, async(req,res)=>{
    try{
        await Class.findOneAndUpdate({classCode:req.body.code},{
            $push:{students:req.user._id}
        })
        const cls = await Class.findOne({classCode:req.body.code})
        await User.findOneAndUpdate({_id:req.user._id},{
            $push:{classes:{classId:cls._id}
            }
        })
        res.redirect('/student-dashboard')
    }
    catch(e){
        console.log(e)
    }
})

module.exports = crouter