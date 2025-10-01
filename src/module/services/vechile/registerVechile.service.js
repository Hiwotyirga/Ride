const Vechile = require('../../models/vehicle');

 exports.register =  async (req, res) => {
  try {
    const vechile = await Vechile.create(req.body);
    res.status(201).json(vechile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

 exports.readMany = async(req,res)=>{
    const vechile = await Vechile.find()
    res.status(200).json(vechile)
}


 exports.readOne = async(req,res)=>{
    const {id}= req.params
    const vechile= await Vechile.findById(id)
     if(!vechile){
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

    const vechile = await Vechile.findByIdAndUpdate(id, updateData, { new: true });

    if (!vechile) {
      return res.status(404).json({ message: "There is no user with this ID" });
    }

    res.status(200).json(vechile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

 exports.remove = async(req,res)=>{

    const {id} =req.params

    try{
        const vechile = await Vechile.findByIdAndDelete(id)

    if(!vechile){
        return res.status(404).json("there is no user  in this id")
    }

    res.status(200).json("successfully deleted data")
    }catch(error){
            res.status(500).json({ error: err.message });

    }
}

