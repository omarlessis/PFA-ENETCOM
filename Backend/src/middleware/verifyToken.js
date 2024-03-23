const jwt = require('jsonwebtoken');
const secretKey = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxMTEzNDU4MCwiaWF0IjoxNzExMTM0NTgwfQ.PtCXJxjm_1AZZDR2icm70HeRa-Cv21VaIpo-xf9tPrM";
const studentModel = require('../model/studentModel');


const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1];
  const token=authHeader
  console.log(authHeader)
  console.log(token)
  if (token == null) {
    return res.status(401).send('Token not found');
  }
  
  try {
    const decoded = jwt.verify(token, secretKey);
    // const user = await studentModel.findOne({id: req.body.id });
    const user = await studentModel.findOne({ _id: decoded.id, role: decoded.role });
    console.log('decoded:', decoded);
    console.log('user:', user);
   
    if (user) {
      // Les informations de l'utilisateur dans le token sont valides
      req.user = user;
      next();
    } else {
      // Le token est invalide ou les informations ne correspondent pas
      res.status(403).send('Access denied');
    }
  } catch (err) {
    console.log(err);
    res.status(403).send('Invalid token');
  }
  
};

module.exports = { authenticateToken};







