const config = require('../config/auth.config');
const db = require('../models');
const {
    user: User,
    role: Role,
    refreshToken: RefreshToken
} = db

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

const signUp = (req,res) => {
    const user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(String(req.body.password), 8)
    });

    user.save((err,user) => {
        if (err) {
            res.status(500).send({ mesage: err});
            return;
        }

        if (req.body.roles) {
            Role.find(
                {
                    name: { $in: req.body.roles }
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return
                    }

                    user.roles = roles.map(role => role._id);
                    user.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }

                        res.send({ message: 'Berhasil membuat user baru.' })
                    })
                }
            )
        } else {
            Role.findOne({ name: 'user'}, (err,role) => {
                if (err) {
                    res.status(500).send({message:err});
                    return;
                }

                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                        res.status(500).send({message: err});
                        return;
                    }

                    res.status(200).send({ message: 'Berhasil membuat user baru.'})
                })
            })
        }
    })
}

const signIn = (req,res) => {
    User.findOne({
        email: req.body.email
    })
    .populate('roles', "-__v")
    .exec( async (err,user) => {
        if (err) {
            res.status(500).send({message:err});
            return
        }

        if (!user) return res.status(404).send({message: 'User tidak ditemukan.'});

        const passwordIsValid = bcrypt.compareSync(
            String(req.body.password),
            user.password
        )

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: 'Password salah.'
            })
        }

        const token = jwt.sign({ id: user.id}, config.secret, {
            expiresIn: 86400
        })

        const refreshToken = await RefreshToken.createToken(user);

        let authorities = [];

        user.roles.map(role => {
            authorities.push('ROLE_' + role.name.toUpperCase());
        })
        res.status(200).send({
            id: user._id,
            email: user.email,
            roles: authorities,
            accessToken: token,
            refreshToken: refreshToken
        })
    })
}

const refreshToken = async (req,res) => {
    const { refreshToken: requestToken } = req.body;

    if (requestToken == null ) return res.status(403).json({ message: 'Refresh Token is required'});

    try {
        let refreshToken = await RefreshToken.findOne({ token: requestToken });

        if (!refreshToken) {
            res.status(403).json({ message: "Refresh token is not found"})
            return;
        }

        if (RefreshToken.verifyExpiration(refreshToken)) {
            RefreshToken.findByIdAndRemove(refreshToken._id, {useFindandModify: false}).exec();
            
            res.status(403).json({
                message: "Refresh token was expired. Please sign in."
            });
            return;
        }

        let newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.secret, {
            expiresIn: config.jwtExpiration
        })

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token
        })
    } catch ( err ) {
        return res.status(500).send({ message: err })
    }
}

module.exports = {
    signUp,
    signIn,
    refreshToken
}