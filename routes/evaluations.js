var express = require('express');
var router = express.Router();
const evaluationsControllers = require('../controllers/evaluations')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage }) 

/* GET service listing. */
router.post('/create', upload.none(), evaluationsControllers.Create);

router.get('/read', evaluationsControllers.Read);

module.exports = router;