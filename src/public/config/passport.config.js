const password = require('passport')
const jwt = require('passport-jwt');

const JWT_SECRET = 'ourSecret'; 

const initializePassport = ()=>{
    password.use('jwt', new jwt.Strategy({
        secretOrKey: JWT_SECRET, 
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor])
    },(jwt_payload, done)=>{
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error)
        }
    }))
}

function cookieExtractor(req){
    let token = null;
    if(req.cookies.coderCookie){
        token = req.cookies.coderCookie;
    }

    return token; 
}

module.exports = {
    initializePassport,
    JWT_SECRET
}; 