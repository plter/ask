/**
 * Created by plter on 2016/11/25.
 */

const {
    checkUserLoginNameInput,
    checkPasswordInput
} = require("./precheck");
const Status = require("../../../source/Status");
const md5 = require("md5-js");
const {cloneObject} = require("../../../source/functions");

module.exports = function (router) {
    router.post("/users/login", checkUserLoginNameInput);
    router.post("/users/login", checkPasswordInput);
    router.post('/users/login', function (req, res) {
        req.models.Member.find({login: req.body.login}, function (err, result) {
            if (!err) {
                if (result.length) {
                    let user = result[0];
                    if (user.pass == md5(req.body.pass)) {
                        let clonedUser = cloneObject(user);
                        delete clonedUser.pass;
                        res.json(Status.makeResult(Status.STATE_OK, Status.STATE_OK_MESSAGE, clonedUser));
                    } else {
                        res.json(Status.makeResult(Status.STATE_PASSWORD_ERROR, Status.STATE_PASSWORD_ERROR_MESSAGE));
                    }
                } else {
                    res.json(Status.makeResult(Status.STATE_NO_SUCH_USER, Status.STATE_NO_SUCH_USER_MESSAGE));
                }
            } else {
                res.json(Status.makeResult(err.errno, err.code));
            }
        });
    });
};