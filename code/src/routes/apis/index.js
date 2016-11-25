/**
 * Created by plter on 2016/11/22.
 */
const Status = require("../../source/Status");
const express = require("express");
const router = express.Router();


router.all('/site/config', function (req, res) {
    req.models.Config.find({}, function (err, result) {
        if (!err) {
            let obj = {};
            for (let item of result) {
                obj[item.name] = item.value;
            }

            res.json(Status.makeResult(Status.STATE_OK, Status.STATE_OK_MESSAGE, obj));
        } else {
            res.json(Status.makeResult(err.errno, err.code));
        }
    });
});


require("./users/users")(router);
require("./question/question")(router);

module.exports = router;
