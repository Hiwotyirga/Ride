const mongoose = require('mongoose')
const { v4:uuidv4} = require('uuid')
const bcrypt = require("bcryptjs");

const driverSchema = mongoose.Schema({
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
driverLicence:{
type:String,
require:true
},

phoneNumber:{
type:String,
require:[true,"please Enter phone number"]
},
status:{
type:String,
enum:["Admin","SuperAdmin","Staff"],
default:"Admin"
},

vichle:{
    id:{
        type:String,
        require:true,
        default:uuidv4

    },
    carName:{
        require:true,
        type:String
    },

carColor:{
type:String,
require:true
}}})

driverSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
    this.password = await bcrypt.hash(this.password, 12)
    next()

});
driverSchema.methods.correctPassword= async function( canditatePassword, password){
    return await bcrypt.compare(canditatePassword, password)

}
const Driver = mongoose.model("Driver", driverSchema)

module.exports = Driver

