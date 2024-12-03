import DOTENV from "dotenv";
import { v2 as CLOUDINARY } from "cloudinary";
import PROCESS from "node:process";
import FILE_SYSTEM from "node:fs";

// Load environment variables from the .env file
DOTENV.config();

CLOUDINARY.config({
    cloud_name: PROCESS.env.CLOUDINARY_CLOUD_NAME,
    api_key: PROCESS.env.CLOUDINARY_API_KEY,
    api_secret: PROCESS.env.CLOUDINARY_API_SECRET,
});

const EXTRACT_PUBLIC_ID = (URL) => {
    const PARTS = URL.split("/upload/")[1]?.split("/");
    return PARTS ? PARTS[PARTS.length - 1].split(".")[0] : null;
};

const UPLOAD_FILE_ON_CLOUDINARY = async (LocalFilePath) => {
    try {
        if (!LocalFilePath) return null;

        const Response = await CLOUDINARY.uploader.upload(LocalFilePath, {
            resource_type: "auto"
        });

        console.log({
            label: "Cloudinary.js",
            service: "UPLOAD_FILE_ON_CLOUDINARY try",
            message: Response,
        });

        FILE_SYSTEM.unlinkSync(LocalFilePath);
        return Response;
    } catch (error) {
        FILE_SYSTEM.unlinkSync(LocalFilePath);

        console.error({
            label: "Cloudinary.js",
            service: "UPLOAD_FILE_ON_CLOUDINARY catch",
            error: error.message,
        });

        return null;
    }
}

const DELETE_FILE_FROM_CLOUDINARY = async (URL) => {
    try {
        if (!URL) return null;

        const PUBLIC_ID = EXTRACT_PUBLIC_ID(URL);
        console.log("URL: ", URL);
        console.log("PUBLIC_ID: ", PUBLIC_ID);

        if (!PUBLIC_ID) return null;

        const Response = await CLOUDINARY.uploader.destroy(PUBLIC_ID);

        console.log({
            label: "Cloudinary.js",
            service: "DELETE_FILE_FROM_CLOUDINARY try",
            message: Response,
        });

        return Response;
    } catch (error) {
        console.error({
            label: "Cloudinary.js",
            service: "DELETE_FILE_FROM_CLOUDINARY catch",
            error: error.message,
        });

        return null;
    }
}

export { UPLOAD_FILE_ON_CLOUDINARY, DELETE_FILE_FROM_CLOUDINARY };