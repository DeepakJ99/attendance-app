const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({
        timestamp:{
            type:Number,
            required:true
        },
        OTP:{
            type:Number
        },
        studentsMarked:[
            {
                type:String
            }
        ]

})

const Attendance = mongoose.model('Attendance',attendanceSchema)
module.exports = {
    Attendance:Attendance,
    att :attendanceSchema
}