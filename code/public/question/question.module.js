/**
 * Created by plter on 2016/11/25.
 */


angular.module("question", []).component("question", {
    templateUrl: "question/question.template.htm",
    controller: function ($scope, $routeParams, $http, $location) {

        function loadQuestionInfo() {
            $http.post(ucai.ServerApis.getQuestion, {questionid: $routeParams.id}).then(function (result) {
                console.log(result);
                switch (result.data.code) {
                    case 1:
                        var q = result.data.result;
                        q.readableTime = ucai.formatDate(new Date(q.time));
                        loadUserInfo(q);
                        $scope.question = q;
                        loadAnswers();
                        break;
                    default:
                        ucai.showAlert("加载问题信息失败");
                        break;
                }
            });
        }

        function addListeners() {
            $scope.answerFormSubmitHandler = function () {
                if (ucai.currentUser) {
                    $http.post(ucai.ServerApis.addAnswer, {
                        content: $scope.content,
                        userid: ucai.currentUser.id,
                        questionid: $scope.question.id
                    }).then(function (result) {
                        console.log(result);

                        switch (result.data.code) {
                            case 1:
                                loadAnswers();
                                break;
                            default:
                                ucai.showAlert("提交答案，请稍候重试");
                                break;
                        }
                    });
                } else {
                    ucai.navigateToLoginPage($location, "/question/" + $scope.question.id);
                }
            };
        }

        function loadUserInfo(answerOrQuestion) {
            answerOrQuestion.userName = "";
            $http.post(ucai.ServerApis.getUser, {userid: answerOrQuestion.member_id}).then(function (result) {
                switch (result.data.code) {
                    case 1:
                        answerOrQuestion.userName = result.data.result.login;
                        break;
                    default:
                        console.warn("加载用户数据失败");
                        break;
                }
            });
        }

        function loadAnswers() {
            $http.post(ucai.ServerApis.getAnswers, {questionid: $scope.question.id}).then(function (result) {
                console.log(result);
                switch (result.data.code) {
                    case 1:
                        if (result.data.result && result.data.result.length) {
                            for (var i = 0; i < result.data.result.length; i++) {
                                var answer = result.data.result[i];
                                answer.readableTime = ucai.formatDate(new Date(answer.time));
                                loadUserInfo(answer);
                            }

                            $scope.answers = result.data.result;
                        }
                        break;
                    default:
                        ucai.showAlert("加载答案失败，请稍候重试");
                        break;
                }
            });
        }

        function init() {
            addListeners();
            loadQuestionInfo();
        }

        init();
    }
});