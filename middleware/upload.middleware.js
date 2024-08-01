const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')


cloudinary.config({
  cloud_name: 'day4e3eir',
  api_key: '965194269863211',
  api_secret: 'KWKxgIhvWXJ2OuvM3sQyE0WWyS4' // Click 'View Credentials' below to copy your API secret
});
module.exports.cloudUpload = async (req, res, next) => {
  if(req.file) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      let result = await streamUpload(req);
      //console.log(req.body)
      req.body[req.file.fieldname] = result.url;
      next();
    }
    upload(req);
    //console.log('OK');
  }
  else {
    next();
  }
}

