

module.exports = {
  userOnly: (req, res, next) => {
    if(!req.session.user){
      return res.status(401).send('Please log in')
    }
    next()
  },

  adminsOnly: (req, res, next) => {
    if(!req.session.user.isAdmin){
      return res.status(403).send('You cannot access this since you are not an admin!')
    }
    next()
  }
}