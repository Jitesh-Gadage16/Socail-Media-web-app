const multer = require('multer')

// module.exports = multer({
//   storage: multer.diskStorage({}),
//   limits: { fileSize: 500000 }
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date.toString() + '-' + file.originalname)
  }


})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'img/jpeg' || file.mimetype === 'img/png') {
    cb(null, true)
  }
  else {
    cb({ Message: 'unsuppoerted filr format' }, false)
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: fileFilter
})

module.exports = upload;
