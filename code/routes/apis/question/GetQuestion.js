/**
 * Created by plter on 2016/11/25.
 */

const {checkQuestionIdInput} = require("../precheck");
const Status = require("../../../source/Status");

module.exports = function (router) {
    router.post("/question/get", checkQuestionIdInput);
    router.post("/question/get", function (req, res) {
        req.models.Question.get(req.body.questionid, function (err, result) {
            if (!err) {
                res.json(Status.makeResult(Status.STATE_OK, Status.STATE_OK_MESSAGE, result));
            } else {
                res.json(Status.makeResult(err.errno, err.code));
            }
        });
    });
};