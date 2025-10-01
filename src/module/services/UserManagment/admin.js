const User = require('../../models/admin');
const utily = require("../../../utility/userUtility");
const { NotFoundException } = require('../../../utility/exceptions');
const Admin = require('../../models/admin');

 exports.register =  async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.status(201).json(userData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

 exports.readMany = async(req,res)=>{
    const user = await User.find()
    res.status(200).json(user)
}


 exports.readOne = async(req,res)=>{
    const {id}= req.params
    const userdata= await User.findById(id)
     if(!userdata){
        throw new NotFoundException("There is data  by this Id ")
    }

    // if(!userdata){
    //     return res.status(401).json('There is no user  int this id')
    // }

    res.status(200).json(userdata)
}

 exports.update =  async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "There is no user with this ID" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

 exports.remove = async(req,res)=>{

    const {id} =req.params

    try{
        const user = await User.findByIdAndDelete(id)

    if(!user){
        return res.status(404).json("there is no user  in this id")
    }

    res.status(200).json("successfully deleted data")
    }catch(error){
            res.status(500).json({ error: err.message });

    }
}

exports.login = async(req,res,next)=>{

        if(!(req.body.password && req.body.phoneNumber)){
            next(new error("password and phoneNumber must be valid"))
        }
        const user = await User.findOne({phoneNumber : req.body.phoneNumber}).select('password')

        // const error
        const correct = await user.correctPassword(req.body.password, user.password)

        if(correct){
            const token = utily.signToken(user.id)
            res.status(200).json({
                success:true,
                message:"login successfully",
                data:{
                    user,
                    token
                }

            })
        }

    }
    

    exports.changePassword = async(req,res)=>{

  const {oldPassword, NewPassword} = req.body

  const findUser = await Admin.findById(req.params.id)

  if(!findUser){
    throw Error("there is  no data  in this Id")
  }
  const validPassword = await bcrypt.compare(oldPassword)

  if(!validPassword){
    throw Error("Old password  is incorrect")
  }
  const hashPassword = await bcrypt.hash(NewPassword,12)
  const data = {
       password : hashPassword

  }
//  const SavedUser = await User.save()
admin = await Admin.findByIdAndUpdate(id,data,{
  new:true,
  runValidators: false,

})
 res.status(200).json("changed password successfully")
}


exports.forgetPassword = async(req,res)=>{
  const {NewPassword} = req.body
  const user = await Admin.findById(req.params.id)

  if(user){
    throw Error("there  is no user in by this phone number")
  }
  const hashPassword = await bcrypt.hash(NewPassword,12)
 const data = {
  password:NewPassword
 }

  await Admin.findByIdAndUpdate(id,data,{
    new:true,
    runValidators:false
    
  })

   res.status(200).json("reset password successfully")


}