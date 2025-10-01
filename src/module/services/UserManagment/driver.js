// const express = require('express');
// const router = express.Router();
const Driver = require('../../models/driver');
const utily = require("../../../utility/userUtility");
const { NotFoundException } = require('../../../utility/exceptions');

 exports.register =  async (req, res) => {
  try {
    const userData = await Driver.create(req.body);
    res.status(201).json(userData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

 exports.readMany = async(req,res)=>{
    const user = await Driver.find()
    res.status(200).json(user)
}


 exports.readOne = async(req,res)=>{
    const {id}= req.params
    const userdata= await Driver.findById(id)
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

    const updatedUser = await Driver.findByIdAndUpdate(id, updateData, { new: true });

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
        const user = await Driver.findByIdAndDelete(id)

    if(!user){
        return res.status(404).json("there is no user  in this id")
    }

    res.status(200).json("successfully deleted data")
    }catch(error){
            res.status(500).json({ error: err.message });

    }
}

exports.login = async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;

    if (!(phoneNumber && password)) {
      return res.status(400).json({ message: "phoneNumber and password must be provided" });
    }

    // find user by phoneNumber
    const user = await Driver.findOne({ phoneNumber }).select("+password"); 
    // make sure your schema has `select: false` for password, otherwise no need `+`

    if (!user) {
      return res.status(401).json({ message: "Invalid phoneNumber or password" });
    }

    // check password
    const correct = await user.correctPassword(password, user.password);
    if (!correct) {
      return res.status(401).json({ message: "Invalid phoneNumber or password" });
    }

    // generate token
    const token = utily.signToken(user.id);

    res.status(200).json({
      success: true,
      message: "login successfully",
      data: {
        user,
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.changePassword = async(req,res)=>{

  const {oldPassword, NewPassword} = req.body

  const findUser = await User.findById(req.params.id)

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
user = await User.findByIdAndUpdate(id,data,{
  new:true,
  runValidators: false,

})
 res.status(200).json("changed password successfully")
}


exports.forgetPassword = async(req,res)=>{
  const {NewPassword} = req.body
  const user = await Driver.findById(req.params.id)

  if(user){
    throw Error("there  is no user in by this phone number")
  }
  const hashPassword = await bcrypt.hash(NewPassword,12)
 const data = {
  password:NewPassword
 }

  await Driver.findByIdAndUpdate(id,data,{
    new:true,
    runValidators:false
    
  })

   res.status(200).json("reset password successfully")


}