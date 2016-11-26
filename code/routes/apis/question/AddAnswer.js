/**
 * Created by plter on 2016/11/26.
 */

const {checkQuestionIdInput, checkUserIdInput} = require("../precheck");
const Status = require("../../../source/Status");

module.exports = function (router) {
    router.post("/question/addanswer", checkUserIdInput);
    router.post("/question/addanswer", checkQuestionIdInput);
    router.post("/question/addanswer", function (req, res) {
        if (req.body.content) {
            req.models.Answer.create({
                question_id: req.body.questionid,
                content: req.body.content,
                time: new Date(),
                member_id: req.body.userid
            }, function (err) {
                if (!err) {
                    res.json(Status.makeResult(Status.STATE_OK, Status.STATE_OK_MESSAGE));
                } else {
                    res.json(Status.makeResult(err.errno, err.code));
                }
            });
        } else {
            res.json(Status.makeResult(Status.STATE_NO_COMMENT_CONTENT, Status.STATE_NO_COMMENT_CONTENT_MESSAGE));
        }
    });
};