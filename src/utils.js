
const passport = require('passport')

const callPassport = (strategy)=>{
    return (req, res, next)=>{
        passport.authenticate(strategy, function(err, user, info){
            if(err) {return next(err)}

            if(!user){
                return res.status(401).send({status:'error', error: info.messages ? info.messages: info.toString() })
            }

            req.user = user; 
            next();
        })(req, res, next)
    }
}

const checkRoleAuthorization = (targettedRole)=>{
    return (req, res, next)=>{
        if(!req.user) return res.status(401).send({status:'error', error:'wron credentials'})
        if(req.user.role != targettedRole) return res.status(403).send({status:'error', error:'not authorized'})

        next();
    }
}

module.exports = {
    callPassport,
    checkRoleAuthorization
}