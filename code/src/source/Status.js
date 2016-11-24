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

    makeResult: function (code, message, result) {
        const obj = {code: code, message: message};
        if (result) {
            obj.result = result;
        }
        return obj;
    }
};