const cloudinary = require('cloudinary').v2;
const fs = require('fs');


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloundinary = async (data) => {
    try {
        if (!data) return null
        //upload file on cloudinary 
        const response = await cloudinary.uploader.upload(data, {
            resource_type: "auto"
        })
        // file has been uplaoded successfully
        console.log("File is uploaded on cloudinary", response.url)
        return response
    } catch (error) {
        fs.unlinkSync(data)//remove the locally saved temp file as the upload operation gets faild
        return null;
    }
}


module.exports = { uploadOnCloundinary };