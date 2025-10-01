const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");

const { v4: uuidv4 } = require('uuid'); 

const UserSchema = mongoose.Schema({

    id:{
        type:String,
        default: uuidv4,   
        require:true,

    },

    name:{
        type:String,
        require:true

    },
    

    phoneNumber:{
        type:String,
        require:[true,"please Enter your phonenumber"]
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,

    },
    role:{
        type:String,
        enum:['Rider',"user"],
        default:"Rider",
    },
    status:{
        type:String,
        enum:["Active","InActive"],
        default:"Active"
    } 
})

UserSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
    this.password = await bcrypt.hash(this.password, 12)
    next()

});
UserSchema.methods.correctPassword= async function( canditatePassword, password){
    return await bcrypt.compare(canditatePassword, password)

}


const User = mongoose.model("User",UserSchema)

module.exports=User