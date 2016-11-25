/**
 * Created by plter on 2016/11/22.
 */

module.exports = {
    STATE_OK: 1,
    STATE_OK_MESSAGE: "ok",
    STATE_NO_USER_LOGGED: 10001,
    STATE_NO_USER_LOGGED_MESSAGE: "No user logged",
    STATE_NO_LOGIN_NAME_PASS: 10002,
    STATE_NO_LOGIN_NAME_PASS_MESSAGE: "No login name pass",
    STATE_NO_PASSWORD_PASS: 10003,
    STATE_NO_PASSWORD_PASS_MESSAGE: "No password pass",
    STATE_NO_USER_ID_PASS: 10004,
    STATE_NO_USER_ID_PASS_MESSAGE: "No user id pass",
    STATE_NO_SUCH_USER: 10005,
    STATE_NO_SUCH_USER_MESSAGE: "No such user",
    STATE_PASSWORD_ERROR: 10006,
    STATE_PASSWORD_ERROR_MESSAGE: "Password error",
    STATE_ACCESS_DENIED_CAN_NOT_UPDATE_OTHERS: 11001,
    STATE_ACCESS_DENIED_CAN_NOT_UPDATE_OTHERS_MESSAGE: "Access denied due to can not update others",
    STATE_NO_TITLE_INPUT: 12001,
    STATE_NO_TITLE_INPUT_MESSAGE: "No title input",

    makeResult: function (code, message, result) {
        const obj = {code: code, message: message};
        if (result) {
            obj.result = result;
        }
        return obj;
    }
};