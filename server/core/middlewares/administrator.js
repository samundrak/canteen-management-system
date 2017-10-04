module.exports  = (req, res, next) => {
     if(req.user.role === 'admin' || req.user.role === 'owner') {
       return next();
     }
    return res.boom.unauthorized();
  };
