import { cart, addToCart, deleteItem, updateQuantity } from "../Controller/carts.controller.js"
import authenticateToken from "../middlewares/auth.js"

export const cartRoutes = (app) => {
    app.get("/api/cart", authenticateToken, cart)
    app.post("/api/cart/add-item/", authenticateToken, addToCart)
    app.delete("/api/cart/delete-item/", authenticateToken, deleteItem)

    // --------- Patch method because just updating field of resourse instade of entire resourse ---------
    app.patch("/api/cart/update-item/", authenticateToken, updateQuantity)
}

