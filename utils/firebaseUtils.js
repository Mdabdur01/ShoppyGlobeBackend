import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../config/firebaseConfig.js";  // Import Firebase storage configuration


/**
 * 
 * @param {Object} file 
 * @returns String
 */

// ------------ Function to upload image to Firebase Storage ------------
export const uploadImageToFirebase = async (file) => {
    const storageRef = ref(storage, `shoppyGlobeProductImages/${file.originalname}`);
    const metadata = { contentType: file.mimetype };

    // ------------ Upload the file to Firebase Storage ------------
    const snapshot = await uploadBytes(storageRef, file.buffer, metadata);

    // ------------ Get the URL for the uploaded file ------------
    const downloadURL = await getDownloadURL(snapshot.ref);
    // console.log(downloadURL)

    return downloadURL;  // ------------ Return Firebase URL
};


/**
 * 
 * @param {String} imageUrl 
 * @returns void
 */

// ------------ Deleting image from firebase ------------
export const deleteImageFromFirebase = async (imageUrl) => {
    // ------ Remove query parameters ------
    const filePathWithParams = imageUrl.split("?")[0];
    // ------ Decode the URL ------
    const decodedFilePath = decodeURIComponent(filePathWithParams)
    // ------ Get the file name ------
    const fileName = decodedFilePath.split("/").pop() // ------------ Extracting the last part after the last '/'
    const storageRef = ref(storage, `shoppyGlobeProductImages/${fileName}`)
    await deleteObject(storageRef);
}
