const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token) {
      throw new Error('No token found')
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.userId

    const user = await User.findByPk(userId)
    req.user = user
    res.locals.user = user

    next()
  } catch (err) {
 
    console.log(err)
    res.redirect('/login')
  }
}

module.exports = authMiddleware