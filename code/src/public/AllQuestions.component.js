/**
 * Created by plter on 2016/11/25.
 */

angular.module("ask").component("allQuestions", {
    templateUrl: "AllQuestions.template.htm",
    controller: function ($scope, $http) {
        $http.post(ucai.ServerApis.questionList).then(function (result) {
            console.log(result);

            switch (result.data.code) {
                case 1:
                    for (var i = 0; i < result.data.result.length; i++) {
                        var question = result.data.result[i];
                        question.readableTime = ucai.formatDate(new Date(question.time));
                    }

                    $scope.questions = result.data.result;
                    break;
                default:
                    ucai.showAlert("无法加载问题列表，请稍候重试");
                    break;
            }
        });
    }
});