/**
 * Created by plter on 2016/11/22.
 */

const orm = require("orm");

module.exports = orm.express("mysql://root:@localhost/ask", {
    define: function (db, models, next) {
        models.Member = db.define("member", {
            id: Number,
            login: String,
            pass: String,
            email: String,
            phone: String,
            id_card: String,
            avatar: String,
            name: String,
            surname: String,
            nickname: String,
            gender: Number//1/*female*/, 2/*male*/
        });
        models.Config = db.define("config", {
            id: Number,
            name: String,
            value: String
        });
        models.Question = db.define("question", {
            id: Number,
            title: String,
            content: String,
            member_id: Number,
            time: Date,
        });
        models.Answer = db.define("answer", {
            id: Number,
            question_id: Number,
            content: String,
            time: Date,
            member_id: Number
        });
        next();
    }
});