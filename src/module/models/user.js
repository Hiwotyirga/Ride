const mongoose = require('mongoose')
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
        default:"Rider",
    }

    
})

const User = mongoose.model("User",UserSchema)

module.exports=User