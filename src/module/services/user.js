const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.status(201).json(userData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/all",async(req,res)=>{
    const user = await User.find()
    res.status(200).json(user)
})


router.get("/:id",async(req,res)=>{
    const {id}= req.params
    const userdata= await User.findById(id)

    if(!userdata){
        return res.status(401).json('There is no user  int this id')
    }

    res.status(200).json(userdata)
})

router.put("/update/:id", async (req, res) => {
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
});

router.delete('/delete/:id',async(req,res)=>{

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
    

})


module.exports = router;
