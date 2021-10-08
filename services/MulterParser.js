const aws = require("aws-sdk")
const multer = require("multer")
const multerS3 = require("multer-s3")

aws.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_ACCESS_SECRET,
  region: process.env.S3_REGION,
})

const s3 = new aws.S3()

const upload = multer({
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: process.env.S3_BUCKET,
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}-${file.originalname}`)
    }
  })
})

module.exports = upload
