const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { ttSchema } = require('./timetable')

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true
    },
    lname:{
        type:String,
        trim:true
    },
    occup:{
        type:String,
        default:'Student',
    },
    ID:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    mno:{
        type:Number,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid email Syntax.')
            }
        }
    },
    pword:{
        type:String,
        required:true,
        minlength:8,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error ('contains password')
            }
        }
    },
    classes:[
        {
            classId:{
                type:String
            }
        }
    ],
    timetable:{
        type:ttSchema
    }
    
})
//creating a json web token
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id : user._id.toString()}, 'attendance')
    return token
}

//verify an existing user by his credentials
userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email:email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password,user.pword)

    if(!isMatch){
        throw new Error('Unable to login')
        return 
    }
    return user
}

//hasing a password
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('pword')){
        user.pword = await bcrypt.hash(user.pword,8)
    }
    next()
})

const User = mongoose.model('User',userSchema)
module.exports = User