var express = require('express');
var router = express.Router();
const employeeControllers = require('../controllers/employee')
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
router.post('/create', upload.none(), employeeControllers.Create);

router.get('/read', employeeControllers.Read);

router.patch('/update/:id', upload.none(), employeeControllers.Update);

router.delete('/delete/:id', employeeControllers.Delete);

// ==================== intern =====================

router.post('/intern/create', upload.none(), employeeControllers.InternCreate);

router.get('/intern/read', employeeControllers.InternRead);

router.patch('/intern/update/:id', upload.none(), employeeControllers.InternUpdate);

router.delete('/intern/delete/:id', employeeControllers.InternDelete);


module.exports = router;