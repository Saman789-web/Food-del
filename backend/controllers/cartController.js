import userModel from "../models/userModel.js";


// add items to usercart
// const addToCart = async (req, res) => {
//     console.log("USER ID FROM TOKEN:", req.userId);
// console.log("ITEM ID:", req.body.itemId);

//     try {
//         // let userData = await userModel.findOne({_id:req.body.userId})
//         let userData = await userModel.findById(req.userId)
//         let cartData = await userData.cartData;
//         if(!cartData[req.body.itemId])
//         {
//             cartData[req.body.itemId] = 1
//         }
//         else{
//             cartData[req.body.itemId] += 1
//         }
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData})
//         res.json({success:true, message:"Added To Cart"})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:"Error"})
//     }

// }



const addToCart = async (req, res) => {
  try {
    console.log("USER:", req.userId);
    console.log("ITEM:", req.body.itemId);

    const userData = await userModel.findById(req.userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // ensure cartData exists
    if (!userData.cartData) {
      userData.cartData = {};
    }

    // update quantity
    if (!userData.cartData[req.body.itemId]) {
      userData.cartData[req.body.itemId] = 1;
    } else {
      userData.cartData[req.body.itemId] += 1;
    }

    // ⭐ VERY IMPORTANT → mark modified for mongoose object field
    userData.markModified("cartData");

    // ⭐ save to database
    await userData.save();

    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log("ADD TO CART ERROR:", error);
    res.json({ success: false, message: "Error adding to cart" });
  }
};

// remove items to user cart

// const removeFromCart = async (req, res) =>{
//     try {
//         let userData = await userModel.findById(req.userId)
//         let cartData = await userData.cartData;
//         if(cartData[req.body.itemId]>0)
//         {
//             cartData[req.body.itemId] -= 1
//         }
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData})
//         res.json({success:true, message:"Removed From Cart"})

//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:"Error"})
        
//     }

// }


const removeFromCart = async (req, res) => {
  try {
    console.log("USER:", req.userId);
    console.log("ITEM:", req.body.itemId);

    const userData = await userModel.findById(req.userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // ensure cartData exists
    if (!userData.cartData) {
      userData.cartData = {};
    }

    // decrease quantity only if > 0
    if (userData.cartData[req.body.itemId] > 0) {
      userData.cartData[req.body.itemId] -= 1;

      // remove key if quantity becomes 0
      if (userData.cartData[req.body.itemId] === 0) {
        delete userData.cartData[req.body.itemId];
      }
    }

    // ⭐ VERY IMPORTANT for Object type
    userData.markModified("cartData");

    // ⭐ save to MongoDB
    await userData.save();

    res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.log("REMOVE ERROR:", error);
    res.json({ success: false, message: "Error removing from cart" });
  }
};


// fetch user cart data

// const getCart = async (req, res) =>{
//     try {
//          let userData = await userModel.findById(req.userId)
//         let cartData = await userData.cartData;
//         res.json({success:true,cartData})
//     } catch (error) {
//          console.log(error)
//         res.json({success:false,message:"Error"})
        
//     }
    
// }


const getCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.userId);

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData;

        res.json({ success: true, cartData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}
export{addToCart, removeFromCart, getCart}