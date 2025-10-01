const { default: mongoose } = require("mongoose");
const { v4:uuidv4} = require('uuid')

const vechileSchema = mongoose.Schema({
    id:{
    type:String,
    require:true,
    default:uuidv4
},
driverId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Driver",
    require:true
},
type:{
    type:String,
    enum:['car','bike'],
    default:'car'
},
capacity:{
    type:String,
    require:true

},
licensePlate:{
    type:String,
    require:true
},
// status:{
//     type:String,
//     enum:[]
// }

})

const Vechile= mongoose.model('Vechile', vechileSchema )

module.exports = Vechile