/**
 * Created by plter on 2016/11/22.
 */

window.ucai = window.ucai || {};

ucai.ServerApis = {
    getCurrentUser: "/apis/users/getcurrentuser",
    getUser: "/apis/users/getuser",
    login: "/apis/users/login",
    register: "/apis/users/register",
    updateUser: "/apis/users/update",
    config: "/apis/site/config",
    submitQuestion: "/apis/question/add",
    questionList: "/apis/question/list",
    addAnswer: "/apis/question/addanswer",
    getAnswers: "/apis/question/answers",
    getQuestion: "/apis/question/get"
};