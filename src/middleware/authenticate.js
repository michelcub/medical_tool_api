const { expressjwt: expressJwt } = require('express-jwt');

const authenticate = expressJwt({
    secret: 'tu_secreto_jwt',
    algorithms: ['HS256'],
    getToken: req => {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        }
        return null;
    }
});

module.exports = authenticate;
