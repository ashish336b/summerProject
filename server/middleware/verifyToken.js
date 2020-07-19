const jwt = require('jsonwebtoken');

const authGuard = {
    verifyToken: (req, res, next) => {
        if (typeof req.headers.authorization === 'undefined')
            return res
                .status(403)
                .json({ error: true, message: 'unauthorized' });
        var token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, '12helloworld12', (err, authdata) => {
            if (err) {
                return res
                    .status(403)
                    .json({ error: true, message: 'unauthorized' });
            } else {
                req.feUser = authdata;
                return next();
            }
        });
    },
};

module.exports = authGuard;
