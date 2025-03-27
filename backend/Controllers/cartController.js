import userModel from "../Models/userModel.js"



//add items to user cart
const addToCart = async (req, res) => {
  try {
    const userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = userData.cartData;

    // If the item doesn't exist in the cart, add it with quantity 1
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      // If the item already exists, increase its quantity
      cartData[req.body.itemId] += 1;
    }

    // Update the user's cart in the database
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({ success: true, message: "Item added to cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

  

//remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    // Find the user by ID
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;

    // Check if the item exists in the cart
    if (!cartData[req.body.itemId]) {
      return res.status(400).json({ success: false, message: "Item not found in cart" });
    }

    // Decrease the quantity of the item in the cart
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;

      // If the quantity becomes 0, you may want to remove the item entirely
      if (cartData[req.body.itemId] === 0) {
        delete cartData[req.body.itemId];  // Remove the item if the quantity is 0
      }
    } else {
      return res.status(400).json({ success: false, message: "Item quantity is already 0" });
    }

    // Update the user's cart in the database
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({ success: true, message: "Item removed from cart successfully" });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


//get user cart
const getCart = async (req, res) => {
  try {
    const userId = req.body.userId || req.query.userId || req.params.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: "Missing userId" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, cartData: userData.cartData });
  } catch (error) {
    console.error("Error getting user cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



export {
    addToCart,
    removeFromCart,
    getCart,
}