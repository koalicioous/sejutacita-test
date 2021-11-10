const db = require('../models');
let bcrypt = require('bcryptjs');
const {
    user: User
} = db;

const getProfile = (req,res) => {
    const user = User.findById(req.userId)
    .exec((err,user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({
            id: user._id,
            email: user.email,
        })
        return;
    })
};

const updatePassword = (req,res) => {
    const { password } = req.body
    
    if (password) {
        return User.findByIdAndUpdate(
            req.userId,
            {
                password: bcrypt.hashSync(password,8)
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

const updateEmail = (req,res) => {
    const { email } = req.body
    if (email) {
        return User.findByIdAndUpdate(
            req.userId,
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


module.exports = {
    getProfile,
    updatePassword,
    updateEmail
}