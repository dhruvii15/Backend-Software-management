const ADMIN = require('../models/admin')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



exports.sequre = async function (req, res, next) {
  try {
    let token = req.headers.authorization
    if (!token) {
      throw new Error('please send Token')
    }
    var decoded = jwt.verify(token, 'KEY');  // invalid signature (for wrong key) , jwt malformed(For wrong token)
    let userCheck = await ADMIN.findById(decoded.id) //if id is wrong throw this msg
    if (!userCheck) {
      throw new Error("user not found")
    }
    req.userId = decoded.id
    next()
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
}

//ADMIN
exports.AdminSignup = async function (req, res, next) {
  try {
    if (!req.body.name || !req.body.email || !req.body.pass) {
      throw new Error('Enter All Fields')
    }

    req.body.pass = await bcrypt.hash(req.body.pass, 8)
    let dataCreate = await ADMIN.create(req.body)


    res.status(201).json({
      status: "Success",
      message: "Admin Signup Successfully",
      data: dataCreate
    })
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message
    })
  }
}


exports.AdminLogin = async function (req, res, next) {
  try {
    if (!req.body.email || !req.body.pass) {
      throw new Error('Enter All Fields')
    }
    let dataFind = await ADMIN.findOne({ email: req.body.email })
    if (!dataFind) {
      throw new Error("Email Id Not Found")
    }
    let passwordverify = await bcrypt.compare(req.body.pass, dataFind.pass)
    if (!passwordverify) {
      throw new Error("password is worng")
    }
    var token = jwt.sign({ id: dataFind._id }, 'KEY')
    res.status(201).json({
      status: "Success",
      message: "Admin login Successfully",
      data: dataFind,
      token
    })
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message
    })
  }
}

exports.AdminRead = async function (req, res, next) {
  try {
    const dataFind = await ADMIN.find();
    res.status(200).json({
      status: "Success!",
      message: "Data Found Successfully",
      data: dataFind
    });
  } catch (error) {
    console.error('Error finding Admin:', error);
    res.status(500).json({
      status: "Fail!",
      message: error.message
    });
  }
};


exports.AdminUpdate = async function (req, res, next) {
  try {
    let dataUpdate = await ADMIN.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(201).json({
      status: "Success",
      message: "Update Successfully",
      data: dataUpdate
    })
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message
    })
  }
}


exports.Forgetpass = async function (req, res, next) {
  try {

      if (!req.body.email || !req.body.confirmpass || !req.body.pass) {
          throw new Error('Please enter fields=======')
      }
      if (req.body.pass !== req.body.confirmpass) {
          throw new Error('Password Is Not Match')
      }
      req.body.pass = await bcrypt.hash(req.body.pass, 8)
      req.body.confirmpass = await bcrypt.hash(req.body.confirmpass, 8)
      let dataupdate = await ADMIN.findOneAndUpdate({ email: req.body.email }, req.body, { new: true })

      if (!dataupdate) {
          throw new Error('Email id Not Found!')
      }
      res.status(201).json({
          status: "Success",
          message: "Password Change Successfully",
          data: dataupdate
      })
  } catch (error) {
      res.status(400).json({
          status: "Fail",
          message: error.message
      })
  }
}