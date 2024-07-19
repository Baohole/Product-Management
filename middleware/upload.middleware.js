const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')


cloudinary.config({
  cloud_name: 'day4e3eir',
  api_key: '965194269863211',
  api_secret: 'KWKxgIhvWXJ2OuvM3sQyE0WWyS4' // Click 'View Credentials' below to copy your API secret
});
module.exports.cloudUpload = async (req, res, next) => {
  //const file = req.file.path;
  console.log( req.file);
  // const uploadResult = await cloudinary.uploader
  // .upload(
  //   `${file}`
  // )
  // .catch((error) => {
  //     console.log(error); 
  // });

  // console.log(uploadResult);
  next();
}

