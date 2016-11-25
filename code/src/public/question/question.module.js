/**
 * Created by plter on 2016/11/25.
 */


angular.module("question", []).component("question", {
    templateUrl: "question/question.template.htm",
    controller: function ($scope, $routeParams, $http) {

        function loadQuestionInfo() {
            $http.post(ucai.ServerApis.getQuestion, {questionid: $routeParams.id}).then(function (result) {
                console.log(result);
                switch (result.data.code) {
                    case 1:
                        $scope.question = result.data.result;
                        break;
                    default:
                        ucai.showAlert("加载问题信息失败");
                        break;
                }
            });
        }

        function init() {
            loadQuestionInfo();
        }

        init();
    }
});