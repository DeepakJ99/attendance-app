const mongoose = require('mongoose')

const att = require('./attendance.js')

const classSchema = new mongoose.Schema({
           className:{
               type:String,
               required:true,
               trim:true
           },
           classCode:{
               type:String,
               required:true,
               trim:true
           },
           teacher:{
               type:String,
               required:true,
               trim:true
           },
           active:{
               type:Boolean,
               default:false
           },
           activeByLoc:{
            type:Boolean,
            default:false
           },
           location:{
               
           },
           students:[
               {
                type:String
               }
            ],
           OTP:{
               type:Number
           },
           attendances:{
               type:att.att
           }

})

const Class = mongoose.model('Class',classSchema)
module.exports = Class