const express = require('express')
const router = new express.Router()
const User = require('../models/user.js')



const auth = require('../middleware/authentication.js')


router.get('/',(req,res)=>{
    res.render('home')
})

router.get('/register-a-user',(req,res)=>{
    res.render('home')
})

router.get('/login',(req,res)=>{
    res.render('home')
})

router.post('/register-a-user',async (req,res)=>{
    console.log(req.body)
    if(req.body.pword == req.body.cpword){
    const user = new User(req.body)
    try{
        console.log('1')
        await user.save()
        console.log('Registered')
        res.status(201).render('home',{
            result : "<div class = 'result' > User "+req.body.fname + " "+req.body.lname + " successfully registered. Proceed to login</div>"
            
        })
    }
    catch(e){
        res.status(400).render('home',{
            result:  "<div class = 'result' > Unable to register.</div>"
        })
    }
    }
    else{
        res.render('home',{
            result:"<div class = 'result'> Passwords mismatch</div>"
        })
    }
    
})

router.post('/login', async(req,res)=>{

    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)

        const token = await user.generateAuthToken()
        res.cookie('accesstoken',token)
        if(user.occup == 'student'){
            res.redirect('/student-dashboard')
        }
        else{
            res.redirect('/teacher-dashboard')
        }
    }
    catch(e){
        
        res.status(400).render('home',{loginResult : "<div class = 'result' >Unable to login</div>"})
    }
})


router.get('/student-dashboard',auth, (req,res)=>{
    res.render('student-dashboard',{ user : req.user.fname })
})


router.get('/teacher-dashboard',auth, (req,res)=>{
    res.render('teacher-dashboard',{ user : req.user.fname })
})


module.exports = router