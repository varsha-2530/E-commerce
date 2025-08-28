import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLODINARY_CLOUD_NAME,
  api_key: process.env.CLODINARY_API_KEY,
  api_secret: process.env.CLODINARY_API_SECRET_KEY,
});

const uploadImageCloudinary = async (image) => {
  try {
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

    const uploadImage = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "MinimalMart" }, 
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error); 
            return reject(error); 
          }
          return resolve(result);
        }
      ).end(buffer);
    });

    return uploadImage;
  } catch (error) {
    console.error("Upload to Cloudinary Failed:", error);
    throw error;
  }
};

export default uploadImageCloudinary;
