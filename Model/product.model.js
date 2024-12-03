import mongoose from "mongoose";
const productsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,  // ---- mendatary field.
        trim: true  // ---- removes extra spaces in the input
    },
    price: {
        type: Number,
        required: true,
        min: 0  // ---- Price must be positive 
    },
    description: {
        type: String,
        trim: true
    },
    stockQuantity: {
        required: true,
        type: Number,
        min: 0
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true }) // ---- Enables timestamps 
const Product = mongoose.model("Product", productsSchema)
export default Product;