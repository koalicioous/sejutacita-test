const db = require('../models');
let bcrypt = require('bcryptjs');
const {
    user: User,
    refreshToken: RefreshToken
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

const setUserEmail = (req,res) => {
    const { userId,email } = req.body
    if (email) {
        return User.findByIdAndUpdate(
            userId,
            {
                email: email
            }
        )
        .then(result => {
            return res.status(203).send({message:'Email updated successfully!'});
        })
        .catch(err => {
            return res.status(500).send({message: err});
        })
    }
    return res.status(500).send({message:'Failed to update email'})
}

const setUserPassword = (req,res) => {
    const { userId,password } = req.body
    
    if (password) {
        return User.findByIdAndUpdate(
            userId,
            {
                password: bcrypt.hashSync(String(password),8)
            }
        )
        .then(result => {
            return res.status(203).send({message:'Password updated successfully!'});
        })
        .catch(err => {
            return res.status(500).send({message: err});
        })
    }
    return res.status(500).send({message:'Failed to update password'})
}

const deleteUser = async (req,res) => {
    await RefreshToken.deleteMany({user:req.body.userId})
    User.findByIdAndDelete(req.body.userId, (err, user) => {
        if (err) {
            res.status(500).send({message:err})
        }
        return res.status(200).send({message:'deleted the account'})
    })
}

module.exports = {
    getUsers,
    getUser,
    setUserEmail,
    setUserPassword,
    deleteUser,
}