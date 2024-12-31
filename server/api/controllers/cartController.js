const Cart = require('../models/Cart');

// post a cart when add to btn clicked

const addToCart = async(req, res) => {
  const {productItemId, name, quantity,image, price, email } = req.body;
  console.log(req.body);
  try {
    // exiting product
    const existingCart = await Cart.findOne({productItemId});
    if(existingCart) {
      return res.status(400).json({message:  'product already existed'})
    }
    const cartItem = await Cart.create({
      productItemId, name, quantity,image, price, email
    })
    res.status(200).json(cartItem)
  } catch (error) {
    
  }
}

// get cart using by email
const getCartByEmail = async(req, res) => {
  try {
    const email = req.query.email;
    const query = {email: email};
    const result = await Cart.find(query).exec()
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

// delete cart
const deleteCart = async(req, res) => {
  const cartId = req.params.id;
  try {
    const deletedCart = await Cart.findByIdAndDelete(cartId);
    if(!deletedCart) {
      res.status(404).json({message: 'cart items not found'})
    }
    res.status(200).json({message: 'cart item deleted successfully'})
  } catch (error) {
    
  }
}
// update a cart item 
const updateCart = async(req, res) => {
  const cartId = req.params.id;
  const {menuItemId,name,recipe, image,category,price,quantity, email} = req.body;
  try {
    const updateCart = await Cart.findByIdAndUpdate(cartId, {
      menuItemId,name,recipe, image,category,price,quantity, email
    }, {new:true,runValidators:true})
    if(!updateCart) {
      return res.status(404).json({message: 'cart is not found'})
    }
    res.status(200).json(updateCart)
  } catch (error) {
    
  }
}


module.exports = {
  addToCart,
  getCartByEmail,
  deleteCart,
  updateCart
}