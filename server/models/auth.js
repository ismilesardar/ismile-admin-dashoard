/**
 * Date: 09/07/2023
 * Subject: E-comers Project models
 * Auth: Ismile Sardar
 */

//third-parity module require
const mongoose = require('mongoose');
const {Schema} = mongoose;
//user schema
const userSchema  = new Schema({
    name:{
        type: String,
        trim:true,
        required: true,
    },
    phone:{
        type: String,
        trim: true,
        required: [true, "Please add Bangladeshi phone number"],
        unique: true,
        match: [/^(?:\+88|88)?(01[3-9]\d{8})$/i, "please enter a valid phone number"],
    },
    password:{
        type: String,
        required: [true, "password is Required!"],
        trim: true,
        minLength: [6, "password must be up 6 characters"],
    },
    role:{
        type: Number,
        trim: true,
        default: 0,
    }
},
{
    timestamps:true,
    versionKey:false
});

//create customer model
const Users = mongoose.model('users', userSchema);
//customer Schema exports
module.exports = Users;