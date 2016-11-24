/**
 * Created by plter on 2016/11/24.
 */

const Status = require("../../source/Status");
const md5 = require("md5-js");

module.exports = function (router) {

    /**
     * 用于检查是否有用户登陆名传入，该函数必须用于处理post请求
     * @param req
     * @param res
     * @param next
     */
    function checkUserLoginNameInput(req, res, next) {
        if (req.body.login) {
            next();
        } else {
            res.json(Status.makeResult(Status.STATE_NO_LOGIN_NAME_PASS, Status.STATE_NO_LOGIN_NAME_PASS_MESSAGE));
        }
    }

    function checkPasswordInput(req, res, next) {
        if (req.body.pass) {
            next();
        } else {
            res.json(Status.makeResult(Status.STATE_NO_PASSWORD_PASS, Status.STATE_NO_PASSWORD_PASS_MESSAGE));
        }
    }

    /* GET users listing. */
    router.all('/users/getuser', function (req, res, next) {
        if (req.session.currentUser) {
            res.json(Status.makeResult(Status.STATE_OK, Status.STATE_OK_MESSAGE, req.session.currentUser));
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
        }, function (err) {
            if (!err) {
                res.json(Status.makeResult(Status.STATE_OK, Status.STATE_OK_MESSAGE));
            } else {
                console.log(err);
                res.json(Status.makeResult(err.errno, err.code));
            }
        });
    });

    router.post("/users/login", checkUserLoginNameInput);
    router.post("/users/login", checkPasswordInput);
    router.post('/users/login', function (req, res) {
        if (!req.body.login) {

        }
    });
};