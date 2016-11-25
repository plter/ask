/**
 * Created by plter on 2016/11/25.
 */


const {
    checkUserIdInput,
    checkUserLoginNameInput,
    checkCurrentUser
} = require("./precheck");

module.exports = function (router) {
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