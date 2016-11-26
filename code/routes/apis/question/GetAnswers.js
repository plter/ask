/**
 * Created by plter on 2016/11/26.
 */

const {checkQuestionIdInput} = require("../precheck");
const Status = require("../../../source/Status");

module.exports = function (router) {

    router.post("/question/answers", checkQuestionIdInput);
    router.post("/question/answers", function (req, res) {
        req.models.Answer.find({question_id: req.body.questionid}, function (err, result) {
            if (!err) {
                res.json(Status.makeOKResult(result));
            } else {
                res.json(Status.makeResultFromOrmError(err));
            }
        });
    });
};