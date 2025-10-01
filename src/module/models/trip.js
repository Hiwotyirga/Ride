const { default: mongoose } = require("mongoose");
const {v4:uuidv4} = require("uuid");
const tripSchema = mongoose.Schema({
    id:{
        type:String,
        require:truec,
        default:uuidv4
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    driver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Driver",
        require:true
    },
    pickupLocaion:{
        type:String,
        require:true
    },
    dropofflocation:{
        type:String,
        require:true
    },
    status:{
        type:String,
        enum:['requested','ongoing', 'completed','cancelled'],
        default:"requested"
    },
    fare:{
        type:String,
        require:true
    },
    distance:{
        type:Number,
        require:true
    },
    createdAt:{
        type:Date,
        require:true
    },
},

    { timestamps: true },
)
const Trip = mongoose.model("Trip", tripSchema)

module.exports = Trip