const { jwt } = require('../middleware')
const { verifyRegistration } = require('../middleware')
const controller = require('../controllers/user.controller')
const adminController = require('../controllers/admin.controller')

module.exports = function(app) {
    app.use((req,res,next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    })

    // Routes for all authenticated User
    app.get('/api/user',[jwt.verifyToken],controller.getProfile);
    app.put('/api/user/password',[jwt.verifyToken],controller.updatePassword);
    app.put('/api/user/email',[jwt.verifyToken,verifyRegistration.emailIsExisted],controller.updateEmail);
    app.delete('/api/user',[jwt.verifyToken],controller.deleteOwnAccount);

    // Routes for Admin
    app.get('/api/users',[jwt.verifyToken,jwt.isAdmin],adminController.getUsers);
    app.get('/api/user/:id', [jwt.verifyToken,jwt.isAdmin], adminController.getUser);
    app.put('/api/admin/email',[jwt.verifyToken,jwt.isAdmin,verifyRegistration.emailIsExisted],adminController.setUserEmail);
    app.put('/api/admin/password',[jwt.verifyToken,jwt.isAdmin],adminController.setUserPassword);
    app.delete('/api/admin/delete',[jwt.verifyToken,jwt.isAdmin],adminController.deleteUser);
}