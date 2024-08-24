const uploadHelper = require('../../helper/upload.helper');

module.exports.cloudUpload = async (req, res, next) => {
  if (req.file) {
    const result = await uploadHelper(req.file.buffer);
    req.body[req.file.fieldname] = result;
    //console.log('OK');
  }
  next();
}

