/**
 * Created by plter on 2016/11/24.
 */

const Status = require("../../../source/Status");
const md5 = require("md5-js");
const {
    checkPasswordInput,
    checkUserLoginNameInput,
    checkCurrentUser,
    checkUserIdInput
} = require("../precheck");
const {
    cloneObject
} = require("../../../source/functions");


module.exports = function (router) {

    /* GET users listing. */
    router.all('/users/getcurrentuser', function (req, res, next) {
        if (req.session.currentUser) {
            let user = cloneObject(req.session.currentUser);
            delete user.pass;
            res.json(Status.makeResult(Status.STATE_OK, Status.STATE_OK_MESSAGE, user));
        } else {
            res.json(Status.makeResult(Status.STATE_NO_USER_LOGGED, Status.STATE_NO_USER_LOGGED_MESSAGE));
        }
    });

    router.post('/users/register', checkUserLoginNameInput);
    router.post('/users/register', checkPasswordInput);
    router.post('/users/register', function (req, res) {
        req.models.Member.create({
            login: req.body.login,
            pass: md5(req.body.pass)
        }, function (err, user) {
            if (!err) {
                req.session.currentUser = user;
                res.json(Status.makeResult(Status.STATE_OK, Status.STATE_OK_MESSAGE, user));
            } else {
                console.log(err);
                res.json(Status.makeResult(err.errno, err.code));
            }
        });
    });

    router.post("/users/getuser", checkUserIdInput);
    router.post("/users/getuser", function (req, res) {
        req.models.Member.get(req.body.userid, function (err, user) {
            if (!err) {
                let userCopy = cloneObject(user);
                delete userCopy.pass;
                res.json(Status.makeResult(Status.STATE_OK, Status.STATE_OK_MESSAGE, userCopy));
            } else {
                res.json(Status.makeResult(err.errno, err.code));
            }
        });
    });

    require("./login")(router);
    require("./update")(router);
};