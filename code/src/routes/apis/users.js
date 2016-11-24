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

    function checkUserIdInput(req, res, next) {
        if (req.body.userid) {
            next();
        } else {
            res.json(Status.makeResult(Status.STATE_NO_USER_ID_PASS, Status.STATE_NO_USER_ID_PASS_MESSAGE));
        }
    }

    /**
     * 检查当前用户的权限
     * @param req
     * @param res
     * @param next
     */
    function checkCurrentUser(req, res, next) {
        if (req.session.currentUser && req.session.currentUser.id == req.body.userid) {
            next();
        } else {
            res.json(Status.makeResult(Status.STATE_ACCESS_DENIED_CAN_NOT_UPDATE_OTHERS, Status.STATE_ACCESS_DENIED_CAN_NOT_UPDATE_OTHERS_MESSAGE));
        }
    }

    /* GET users listing. */
    router.all('/users/getcurrentuser', function (req, res, next) {
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
        }, function (err, user) {
            if (!err) {
                req.session.currentUser = {
                    id: user.id,
                    login: user.login
                };
                res.json(Status.makeResult(Status.STATE_OK, Status.STATE_OK_MESSAGE, user));
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
            //TODO login
        }
    });

    router.post("/users/getuser", checkUserIdInput);
    router.post("/users/getuser", function (req, res) {
        req.models.Member.get(req.body.userid, function (err, user) {
            if (!err) {
                let userCopy = {};
                for (let k in user) {
                    userCopy[k] = user[k];
                }
                delete userCopy.pass;
                res.json(Status.makeResult(Status.STATE_OK, Status.STATE_OK_MESSAGE, userCopy));
            } else {
                res.json(Status.makeResult(err.errno, err.code));
            }
        });
    });

    router.post("/users/update", checkUserIdInput);
    router.post("/users/update", checkUserLoginNameInput);
    router.post("/users/update", checkCurrentUser);
    router.post("/users/update", function (req, res) {
        req.models.Member.get(req.body.userid, function (err, user) {
            if (!err) {
                user.login = req.body.login;
                user.email = req.body.email;
                user.phone = req.body.phone;
                user.name = req.body.name;
                user.surname = req.body.surname;
                user.gender = req.body.gender;
                user.id_card = req.body.id_card;
                user.nickname = req.body.nickname;

                user.save(function (err) {
                    if (!err) {
                        res.json(Status.makeResult(Status.STATE_OK, Status.STATE_OK_MESSAGE));
                    } else {
                        res.json(Status.makeResult(err.errno, err.code));
                    }
                });
            } else {
                res.json(Status.makeResult(err.erron, err.code));
            }
        });
    });
};