/**
 * Created by plter on 2016/11/25.
 */

const Status = require("../../../source/Status");

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

module.exports = {
    checkUserIdInput: checkUserIdInput,
    checkUserLoginNameInput: checkUserLoginNameInput,
    checkCurrentUser: checkCurrentUser,
    checkPasswordInput: checkPasswordInput
};