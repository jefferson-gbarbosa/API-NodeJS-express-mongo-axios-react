const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.token;
  if(token){
    jwt.verify(token, process.env.SECRET, (err, decoded)=> {
      if(err){
        res.json({ status: 'Erro'});
      }else{
        req.user= decoded
        next();
      }
    })
  }else{
    res.json({ status: 'Erro'});
  }

};

// check current user
const requireRefreshToken = (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    
    console.log(refreshTokenCookie)
    if (!refreshTokenCookie) throw new Error("No token found");
    jwt.verify(refreshTokenCookie,process.env.JWT_REFRESH, (err, decoded)=> {
      if(err){
        res.json({ status: 'Erro'});
      }else{
        req.user= decoded
        next();
      }
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server error" });
  } 
};


module.exports = { requireAuth, requireRefreshToken };