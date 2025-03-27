import foodModel from "../Models/foodModel.js";
import fs from "fs";

//add food item

const addFood = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  try {
    const image_filename = req.file.filename;
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename
    });

    await food.save();
    res.status(201).json({ success: true, message: "Food added successfully" });
  } catch (error) {
    console.error("🔴 Error adding food:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// all food list
const listFood =async(req,res)=> {
try{
  const foods = await foodModel.find({});
  res.json({ success: true, data:foods});
}
catch(error){
  console.error(" Error getting food list:", error);
  res.status(500).json({ success: false, message: "Server error" });
}
}

// delete food item
const removeFood = async(req,res)=>{
  try{
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{});
    await foodModel.findByIdAndDelete(req.body.id)
    res.json({ success: true, message: "food deleted successfully" });
  }
  catch(error){
    console.error("Error deleting food:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}


export { 
  addFood,
  listFood,
  removeFood
 };
