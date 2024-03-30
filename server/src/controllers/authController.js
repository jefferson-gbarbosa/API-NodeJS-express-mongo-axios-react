const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const generateRefreshToken = (id,res) =>{
  const expiresIn = 60 * 60 * 24 * 30;
  try {
      const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH, {
          expiresIn,
      });
  
      return res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          expires: new Date(Date.now() + expiresIn * 1000),
      });
  } catch (err) {
      console.log(err);
  }
}

module.exports.register = async (req, res) => {
  const {name, email, password} = req.body;
  // check if user exits
  const userExists = await User.findOne({ email: email });
  if(userExists){
    // return next(new createError('User already exists',400));
     return res.status(400).json({message: 'User already exists'})
  }
  // Creat password
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  // Creat User
  const user = new User({
    name,
    email,
    password: passwordHash,
  })

  // if(password !== confirmpassword){
  //   return res.status(422).json({
  //       msg: 'As senhas não conferem!'
  //   })
  // }
  try {
    await user.save();
    // return next(new createError('User registered sucessfully',201));
    res.status(201).json({ user, message:'User registered sucessfully' })
  } catch (err) {
    // next(err)
    res.status(500).json({message: 'A server error occurred, please try again later!'})
  }
}

module.exports.login = async(req, res) => {
    const { email, password } = req.body;
    // check if user exits
    const user = await User.findOne({ email: email })

    if(!user){
        return res.status(400).json({message: 'User does not exist'})
    }

    // check if password match
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
        return res.status(401).json({ message: "Incorrect email or password" });
    }

    try {
      const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 60 * 15});
      res.cookie('token', token);
      generateRefreshToken(user.id,res);
      return res.json({status: 'success', token});
    } catch (err) {
      res.status(500).json({message: 'A server error occurred, please try again later!'})
    }
}

module.exports.infoUser = async (req, res) => {
  const id = req.user.id;
  try {
    const user = await User.findById(id);
    return res.json({ status: 'success', name: user.name, email: user.email});
  } catch (err) {
    return res.status(500).json({ message: "A server error occurred, please try again later!" });
  }

};

module.exports.refreshToken = (req, res) => {
  const id = req.user.id;
  try {
    const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: 60 * 15});
    return res.json({ token });
  } catch (err) {
      return res.status(500).json({ message: "A server error occurred, please try again later!" });
  }
};
module.exports.forgotPassword = async(req, res) =>{
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email: email });

    if(!oldUser){
      return res.status(422).json({
        message: 'User does not exist'
      })
    }
    
    const token = jwt.sign({ id: oldUser.id }, process.env.SECRET, { expiresIn: 60 * 15});

    var transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    var mailOptions = {
      from: 'youremail@gmail.com',
      to: 'myfriend@yahoo.com',
      subject: 'Reset password',
      text: `http://localhost:5173/reset-password/${token}`
    };
    
    transport.sendMail(mailOptions, function(error, info){
      if (error) {
        return res.status(401).json({message: 'error sending email'});
      } else {
        return res.json({status: 'success', message: 'email sent'});
      }
    });
   
  } catch (err) {
      return res.status(500).json({ message: "A server error occurred, please try again later!" });
  }
}
module.exports.resetPassword = async(req, res) => {
  const {token} = req.params;
  const {password} = req.body;
  try {
    const verify = jwt.verify(token, process.env.SECRET)
    const id = verify.id;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    await User.findByIdAndUpdate({_id:id}, { password: passwordHash})
    return res.json({status: 'success', message:'updated password'})
  } catch (err) {
    return res.status(500).json({ message: "A server error occurred, please try again later!" });
  }
};
module.exports.logout = (req, res) => {
  res.clearCookie("refreshToken",{expiresIn: 0});
  res.json({ status: 'success' });
};

