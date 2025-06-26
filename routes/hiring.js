var express = require('express');
var router = express.Router();
const hiringControllers = require('../controllers/hiring')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/hiringresume');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const cleanOriginalName = file.originalname.replace(/\s+/g, ''); // remove all spaces
    cb(null, file.fieldname + '-' + uniqueSuffix + ".pdf");
  }
});

const upload = multer({ storage: storage })  

/* GET service listing. */
router.post('/create', upload.single('resume'), hiringControllers.Create);

router.get('/read', hiringControllers.Read);

router.patch('/update/:id', upload.single('resume'), hiringControllers.Update);

router.delete('/delete/:id', hiringControllers.Delete);


module.exports = router;