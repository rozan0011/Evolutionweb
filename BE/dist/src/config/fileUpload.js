import cloudinary from './cloudinary';
import streamifier from 'streamifier';
export const uploadFile = (buffer, folder) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({
            folder: folder
        }, (error, result) => {
            if (result) {
                resolve(result.secure_url);
            }
            else {
                reject(error);
            }
        });
        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
};
