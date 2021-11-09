const { verifyRegistration } = require('../middleware')
const controller = require('../controllers/auth.controller')

module.exports = function(app) {
    app.use((req,res,next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.post(
        '/api/auth/signup',
        [
            verifyRegistration.emailIsExisted,
            verifyRegistration.roleIsExisted
        ],
        controller.signUp
    );

    app.post('/api/auth/signin', controller.signIn);

    app.post('/api/auth/refreshToken', controller.refreshToken);
}