const { jwt } = require('../middleware')
const controller = require('../controllers/user.controller')

module.exports = function(app) {
    app.use((req,res,next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    })

    app.get('/api/', controller.publicContent);

    app.get('/api/user',[jwt.verifyToken],controller.userContent)

    app.get('/api/admin',
    [jwt.verifyToken,jwt.isAdmin],
        controller.adminContent
    )
}