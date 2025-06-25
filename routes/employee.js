var express = require('express');
var router = express.Router();
const employeeControllers = require('../controllers/employee')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/salaryreport');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const cleanOriginalName = file.originalname.replace(/\s+/g, ''); // remove all spaces
    cb(null, file.fieldname + '-' + uniqueSuffix + ".pdf");
  }
});
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


// ====================== Salary =============================
router.post('/salary/create', upload.single('pdf'), employeeControllers.SalaryCreate);

router.get('/salary/read', employeeControllers.SalaryRead);

router.patch('/salary/update/:id', upload.single('pdf'), employeeControllers.SalaryUpdate);

router.delete('/salary/delete/:id', employeeControllers.SalaryDelete);

// ==================== DASHBOARD =========================

router.get('/dashboard', employeeControllers.Dashboard);


module.exports = router;