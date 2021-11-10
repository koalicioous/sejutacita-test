const db = require('../models');
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

const userContent = (req,res) => {
    res.status(200).send('Available for authorized user.');
}

const adminContent = (req,res) => {
    res.status(200).send('Available for admin only.');
}

module.exports = {
    getProfile,
    userContent,
    adminContent
}