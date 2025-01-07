"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
var cloudinary_1 = __importDefault(require("./cloudinary"));
var streamifier_1 = __importDefault(require("streamifier"));
var uploadFile = function (buffer, folder) {
    return new Promise(function (resolve, reject) {
        var uploadStream = cloudinary_1.default.uploader.upload_stream({
            folder: folder
        }, function (error, result) {
            if (result) {
                resolve(result.secure_url);
            }
            else {
                reject(error);
            }
        });
        streamifier_1.default.createReadStream(buffer).pipe(uploadStream);
    });
};
exports.uploadFile = uploadFile;
