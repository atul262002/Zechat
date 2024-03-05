const multer = require('multer');
const cloudinary = require('../config/cloudinary');

class MulterMiddleware {
  constructor() {
    this.storage = multer.memoryStorage();
    this.upload = multer({ storage: this.storage });
  }

  uploadToCloudinary(fileBuffer) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }).end(fileBuffer);
    });
  }

  middleware() {
    return async (req, res, next) => {
      this.upload.single('profilePhoto')(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: 'Image file is required' });
        }
        if (!req.file) {
          return res.status(400).json({ error: 'Image file is required' });
        }

        try {
          const imageUrl = await this.uploadToCloudinary(req.file.buffer);
          req.imageUrl = imageUrl;
          next();
        } catch (error) {
          console.error('Error uploading to Cloudinary:', error);
          return res.status(500).json({ error: 'Internal Server Error problem' });
        }
      });
    };
  }
}

const multerMiddleware = new MulterMiddleware();

module.exports = multerMiddleware.middleware();
