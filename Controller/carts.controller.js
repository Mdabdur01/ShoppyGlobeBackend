import Cart from "../Model/cart.model.js"
import Product from "../Model/product.model.js"
import { calculateTotalPriceOfCartItem, notFound } from "../utils/helpers.js"


// ------------------------------ Get accsess to the user Cart ------------------------------
export const cart = async (req, res) => {
    const userId = req.user.userId // -------------------- Auth user id 
    try {
        // ------------------ Get cart of the user by id ------------------
        const cart = await Cart.findOne({ userId })
        return res.status(200).json({ cart: cart })
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// ------------------ Add a product to the cart ------------------
export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body
    const userId = req.user.userId
    try {
        const product = await Product.findById(productId)
        if (!product) return notFound(req);

        // ------------------ Get cart of the user by id ------------------
        let cart = await Cart.findOne({ userId })

        // ------------------ Check if user have cart if not then create one ------------------
        if (!cart) {
            cart = new Cart({ userId, items: [] })
        }

        // ------------------ Check if item already exits in his cart ------------------
        const isItemExist = cart.items.find((item) => item.productId.toString() === productId)

        if (isItemExist) {
            return res.status(400).json({ message: "Item already exist in a cart" })
        }
        // ------------------ Adding new product to the cart ------------------
        cart.items.push({ productId, quantity, price: product.price })


        // ------------------ Recalculating total price ------------------
        cart.totalPrice = calculateTotalPriceOfCartItem(cart.items)

        // ------------------ Save the changes ------------------
        await cart.save();
        return res.status(200).json({ message: "New item is added to the cart..", cart: cart })
    }
    catch (error) {
        return res.status(500).json({ message: "Server error :", error: error.message });
    }
}

// ------------------------------ Deleting item from cart ------------------------------
export const deleteItem = async (req, res) => {
    const { productId } = req.body
    const userId = req.user.userId

    try {
        // ------------------ Get cart of the user by id ------------------
        const cart = await Cart.findOne({ userId })
        if (!cart) {
            return notFound(res, "Cart")
        }
        // ------------------ Filtering out the item which we want to delete ------------------
        const filteredItems = cart.items.filter((item) => item.productId.toString() !== productId)
        if (filteredItems.length === cart.items.length) {
            return notFound(res, "Item")
        }

        // ------------------ Updating the cartItems with filtered array ------------------
        cart.items = filteredItems

        // ------------------ Re calculate the total price ------------------ 
        cart.totalPrice = calculateTotalPriceOfCartItem(filteredItems)

        // ------------------ Save the changes ------------------
        await cart.save();
        return res.status(200).json({ message: 'Item deleted from cart', cart: cart });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


// ------------------------------ Updating quantity of the cart item ------------------------------
export const updateQuantity = async (req, res) => {
    const { quantity, productId } = req.body
    const userId = req.user.userId
    try {
        // ------------------ Get cart of the user by id ------------------
        const cart = await Cart.findOne({ userId })
        if (cart.items.length === 0) return res.status(400).json({ message: "Your cart is empty." })

        // ------------------ Filtering out the item which we want to delete ------------------
        const item = cart.items.find((item) => item.productId.toString() === productId)

        // ------------------ Return if not found ------------------
        if (!item) {
            return notFound(res, "Item");
        }

        // ------------------ updating the quantity ------------------
        item.quantity = quantity

        // ------------------ Re calculate the total price ------------------ 
        cart.totalPrice = calculateTotalPriceOfCartItem(cart.items)

        // ------------------ Save the changes ------------------
        await cart.save()
        return res.status(200).json({ message: "product quantity is updated.", cart: cart });
    } catch (error) {
        return res.json({ error: error.message })
    }
}







