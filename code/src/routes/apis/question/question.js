/**
 * Created by plter on 2016/11/25.
 */

const {
    checkUserIdInput,
    checkCurrentUser
} = require("../precheck");
const Status = require("../../../source/Status");
const orm = require("orm");

module.exports = function (router) {

    //用于添加一个问题
    router.post("/question/add", checkUserIdInput);
    router.post("/question/add", checkCurrentUser);
    router.post("/question/add", function (req, res) {
        if (req.body.title) {
            req.models.Question.create({
                title: req.body.title,
                content: req.body.content,
                member_id: req.body.userid,
                time: new Date()
            }, function (err) {
                if (!err) {
                    res.json(Status.makeResult(Status.STATE_OK, Status.STATE_OK_MESSAGE));
                } else {
                    res.json(Status.makeResult(err.errno, err.code));
                }
            });
        } else {
            res.json(Status.makeResult(Status.STATE_NO_TITLE_INPUT, Status.STATE_NO_TITLE_INPUT_MESSAGE));
        }
    });


    router.post("/question/list", function (req, res) {
        var query = {};

        if (req.body.userid) {
            query.member_id = req.body.userid;
        }

        if (req.body.keyword) {
            query.title = orm.like(`%${req.body.keyword}%`);
        }

        req.models.Question.find(query, "-time", function (err, result) {
            if (!err) {
                res.json(Status.makeResult(Status.STATE_OK, Status.STATE_OK_MESSAGE, result));
            } else {
                res.json(Status.makeResult(err.errno, err.code));
            }
        });
    });

    require("./GetQuestion")(router);

};