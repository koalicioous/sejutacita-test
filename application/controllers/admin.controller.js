const db = require('../models')
const {
    user: User
} = db;

const getUsers = (req,res) => {
    const users = User.find({})
    .exec((err,users) => {
        if (err) {
            res.status(500).send({ message: err});
            return;
        }
        res.status(200).send({
            users: users
        })
        return;
    })
}

const getUser = (req,res) => {
    const user = User.findById(req.params.id)
    .populate('roles')
    .exec((err,user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({
            id: user.id,
            email: user.email,
            password: user.password,
            roles: user.roles
        });
        return;
    })
}

module.exports = {
    getUsers,
    getUser
}