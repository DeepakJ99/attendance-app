const mongoose = require('mongoose')

const ttSchema = new mongoose.Schema({
            m1:{
            type:String,
            default:'--'},
            m2:{
            type:String,
            default:'--'},
            m3:{
            type:String,
            default:'--'},
            m4:{
            type:String,
            default:'--'},
            m5:{
            type:String,
            default:'--'},
            m6:{
            type:String,
            default:'--'},
            m7:{
            type:String,
            default:'--'},

            t1:{
            type:String,
            default:'--'},

            t2:{
            type:String,
            default:'--'},t3:{
            type:String,
            default:'--'},
            t4:{
            type:String,
            default:'--'},

            t5:{
            type:String,
            default:'--'},
            t6:{
            type:String,
            default:'--'},
            t7:{
            type:String,
            default:'--'},
            w1:{
            type:String,
            default:'--'},
            w2:{
            type:String,
            default:'--'},w3:{
            type:String,
            default:'--'},
            w4:{
            type:String,
            default:'--'},

            w5:{
            type:String,
            default:'--'},
            w6:{
            type:String,
            default:'--'},
            w7:{
            type:String,
            default:'--'},
            th1:{
            type:String,
            default:'--'},
            th2:{
            type:String,
            default:'--'},
            th3:{
            type:String,
            default:'--'},
            th4:{
            type:String,
            default:'--'},
            th5:{
            type:String,
            default:'--'},
            th6:{
            type:String,
            default:'--'},
            th7:{
            type:String,
            default:'--'},
            f1:{
            type:String,
            default:'--'},f2:{
            type:String,
            default:'--'},f3:{
            type:String,
            default:'--'},f4:{
            type:String,
            default:'--'},f5:{
            type:String,
            default:'--'},f6:{
            type:String,
            default:'--'},f7:{
            type:String,
            default:'--'}
})

const TimeTable = mongoose.model('TimeTable',ttSchema)
module.exports = {
    ttSchema,TimeTable
}