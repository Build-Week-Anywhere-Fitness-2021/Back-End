  
module.exports = {
    checkInstructor
  };
  
  function checkInstructor(req, res, next) {
    if (req.jwt && req.jwt.role === 'instructor') {
      next();
    } else {
      res.status(403).json({message: 'Sorry! You must be an instructor to access this.'});
    }
  }