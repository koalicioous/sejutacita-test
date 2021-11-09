const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

const emailIsExisted = (req, res, next) => {
    User.findOne({
        email: req.body.email
    }).exec( (err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        if ( user) {
            res.status(400).send({ message: 'Maaf, email yang kamu masukkan sudah terdaftar'})
            return;
        }

        next();
    })
}

const roleIsExisted = (req, res, next) => {
    if (req.body.roles) {
        req.body.roles.map( role => {
            if(!ROLES.includes(role)) {
                res.status(400).send({
                    message: 'Role yang didaftarkan tidak tersedia'
                });
                return;
            }
        })
    }

    next();
}

const verifyRegistration = {
    emailIsExisted,
    roleIsExisted
};

module.exports = verifyRegistration;
