const mongoose = require('mongoose')
const { v4:uuidv4} = require('uuid')
const bcrypt = require("bcryptjs");

const adminSchema = mongoose.Schema({
    id:{
        type:String,
        require:true,
        default:uuidv4

    },
name:{
    type:String,
    require:[true, "Please enter your name"]
},
password:{
    type:String,
    require:[true,"please enter password"]
},

email:{
    type:String,
    require:false
},
Image:{
type:String
},
phoneNumber:{
type:String,
require:[true,"please Enter phone number"]
},
status:{
type:String,
enum:["Admin","SuperAdmin","Staff"],
default:"Admin"
}})

adminSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
    this.password = await bcrypt.hash(this.password, 12)
    next()

});
adminSchema.methods.correctPassword= async function( canditatePassword, password){
    return await bcrypt.compare(canditatePassword, password)

}
const Admin = mongoose.model("Admin", adminSchema)

module.exports = Admin

