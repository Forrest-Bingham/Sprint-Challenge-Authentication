const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

const { jwtSecret } = require('../auth/config/secrets')

const Auth = require('./auth-model.js');


router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Auth.add(user)
  .then(saved => {
    res.status(201).json(saved);
  })
  .catch(error => {
    res.status(500).json(error);
  })
});

router.post('/login', (req, res) => {
  // implement login
  let {username, password } = req.body;

  Auth.findBy({username})
  .first()
  .then(user => {
    if(user && bcrypt.compareSync(password, user.password)){
      const token = signToken(user);
      console.log("Token", token);
      
      res.status(200).json({
        message:`Welcome back ${user.username}`,
        userId: user.id,
        token: token,
      })

    } else {
        res.status(401).json({message: "Invalid Credentials"})
    }
  })
  .catch( error => {
    console.log(error);
    res.status(500).json(error);
  })
});

function signToken(user){
  const payload={
    
  };

  const options = {
    expiresIn: '2h'
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
