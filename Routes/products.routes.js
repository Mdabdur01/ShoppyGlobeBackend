import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../Controller/products.controller.js"
import { UPLOAD as upload } from "../middlewares/uploadImage.js"
import { validate } from "../middlewares/validate.js"
// import { productValidationRules } from "../validators/productValidator.js"

export const productRoutes = (app) => {
    app.get("/api/products", getAllProducts)
    app.get("/api/products/:id", getSingleProduct)
    app.post("/api/product",
        upload.fields([
            {
                name: "image", // name should be same as in User.Model schema.
                maxCount: 1
            }
        ]), validate, createProduct)
    app.delete("/api/product/:id", deleteProduct)
    app.put("/api/product/:id",
        upload.fields([
            {
                name: "image", // name should be same as in User.Model schema.
                maxCount: 1
            }
        ]), validate, updateProduct)
}